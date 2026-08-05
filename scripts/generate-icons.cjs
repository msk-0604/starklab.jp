/**
 * ロゴ画像からファビコン類とヘッダー用ロゴを生成する。
 * ヘッダーは元デザインを維持し、ファビコンは元画像の「S」と矢印を
 * 抽出した小サイズ専用マークにする。
 *
 *   node scripts/generate-icons.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "public/brand/stark-lab-logo.png");

/** 正方形ロゴ画像内でロゴが占める割合。残りは余白 */
const CONTENT_RATIO = 0.88;

const SQUARE_OUTPUTS = [
  { file: "public/brand/stark-lab-logo-square.png", size: 1024 },
];

/** ヘッダー等で使う背景透過ロゴ */
const TRANSPARENT_OUTPUT = "public/brand/stark-lab-logo-mark.png";

/** 小サイズ専用のブランドマーク */
const FAVICON_MARK_OUTPUT = "public/brand/stark-lab-favicon.png";
const FAVICON_OUTPUTS = [
  { file: "src/app/icon.png", size: 512 },
  { file: "src/app/apple-icon.png", size: 180 },
];

/** favicon.ico に含めるサイズ。小さいほど余白を詰めて視認性を確保する */
const ICO_OUTPUT = "src/app/favicon.ico";
const ICO_SIZES = [16, 32, 48];

/** PNGを埋め込んだICOファイルを組み立てる */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;

  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...pngs.map((png) => png.data),
  ]);
}

const luminance = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

/**
 * 白背景の線画を透過PNGに変換する。
 * 背景の明るさを基準にアルファを算出するため、線のアンチエイリアスが保たれる。
 */
async function toTransparent(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const bgLum = luminance(data[0], data[1], data[2]) || 255;

  let ink = { r: 0, g: 0, b: 0 };
  let darkest = Number.POSITIVE_INFINITY;
  for (let i = 0; i < data.length; i += info.channels) {
    const lum = luminance(data[i], data[i + 1], data[i + 2]);
    if (lum < darkest) {
      darkest = lum;
      ink = { r: data[i], g: data[i + 1], b: data[i + 2] };
    }
  }

  for (let i = 0; i < data.length; i += info.channels) {
    const lum = luminance(data[i], data[i + 1], data[i + 2]);
    const alpha = Math.round(((bgLum - lum) / bgLum) * 255);
    data[i] = ink.r;
    data[i + 1] = ink.g;
    data[i + 2] = ink.b;
    data[i + 3] = Math.max(0, Math.min(255, alpha));
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer();
}

/**
 * 線画を連結成分に分解し、指定した成分だけを透過PNGとして取り出す。
 * 書き直しではなく元画像の実際の線を使用する。
 */
async function extractLogoParts(buffer) {
  const { data, info } = await sharp(buffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const labels = new Int32Array(width * height).fill(-1);
  const components = [];
  const threshold = 180;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const start = y * width + x;
      if (labels[start] !== -1 || data[start] > threshold) continue;

      const id = components.length;
      const stack = [start];
      labels[start] = id;
      const component = {
        id,
        count: 0,
        minX: x,
        maxX: x,
        minY: y,
        maxY: y,
      };

      while (stack.length > 0) {
        const current = stack.pop();
        const currentX = current % width;
        const currentY = Math.floor(current / width);
        component.count += 1;
        component.minX = Math.min(component.minX, currentX);
        component.maxX = Math.max(component.maxX, currentX);
        component.minY = Math.min(component.minY, currentY);
        component.maxY = Math.max(component.maxY, currentY);

        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            const nextX = currentX + offsetX;
            const nextY = currentY + offsetY;
            if (
              nextX < 0 ||
              nextY < 0 ||
              nextX >= width ||
              nextY >= height
            ) {
              continue;
            }
            const next = nextY * width + nextX;
            if (labels[next] === -1 && data[next] <= threshold) {
              labels[next] = id;
              stack.push(next);
            }
          }
        }
      }

      if (component.count >= 20) components.push(component);
    }
  }

  const widthOf = (component) => component.maxX - component.minX + 1;
  const heightOf = (component) => component.maxY - component.minY + 1;
  const arrow = [...components].sort((a, b) => widthOf(b) - widthOf(a))[0];
  const letterS = [...components]
    .filter((component) => heightOf(component) > widthOf(component))
    .sort((a, b) => b.count - a.count)[0];

  if (!arrow || !letterS) {
    throw new Error("ロゴからSまたは矢印を抽出できませんでした");
  }

  async function renderComponent(component, color) {
    const padding = 3;
    const left = Math.max(0, component.minX - padding);
    const top = Math.max(0, component.minY - padding);
    const right = Math.min(width - 1, component.maxX + padding);
    const bottom = Math.min(height - 1, component.maxY + padding);
    const outputWidth = right - left + 1;
    const outputHeight = bottom - top + 1;
    const rgba = Buffer.alloc(outputWidth * outputHeight * 4);

    for (let y = top; y <= bottom; y += 1) {
      for (let x = left; x <= right; x += 1) {
        const sourceIndex = y * width + x;
        let belongs = labels[sourceIndex] === component.id;

        // 閾値外のアンチエイリアスも、成分の近傍なら取り込む
        if (!belongs && data[sourceIndex] < 250) {
          for (let dy = -2; dy <= 2 && !belongs; dy += 1) {
            for (let dx = -2; dx <= 2; dx += 1) {
              const nearX = x + dx;
              const nearY = y + dy;
              if (
                nearX >= 0 &&
                nearY >= 0 &&
                nearX < width &&
                nearY < height &&
                labels[nearY * width + nearX] === component.id
              ) {
                belongs = true;
                break;
              }
            }
          }
        }

        if (!belongs) continue;
        const targetIndex = ((y - top) * outputWidth + (x - left)) * 4;
        rgba[targetIndex] = color.r;
        rgba[targetIndex + 1] = color.g;
        rgba[targetIndex + 2] = color.b;
        rgba[targetIndex + 3] = Math.max(0, Math.min(255, 255 - data[sourceIndex]));
      }
    }

    const png = await sharp(rgba, {
      raw: {
        width: outputWidth,
        height: outputHeight,
        channels: 4,
      },
    })
      .png()
      .toBuffer();

    return { png, width: outputWidth, height: outputHeight };
  }

  return {
    letterS: await renderComponent(letterS, { r: 255, g: 255, b: 255 }),
    arrow: await renderComponent(arrow, { r: 37, g: 99, b: 235 }),
  };
}

/** 元の手書きSと矢印を使った、小サイズで識別しやすいブランドマーク */
async function createFaviconMark(source, size = 1024) {
  const { letterS, arrow } = await extractLogoParts(source);
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#111318"/>
          <stop offset="1" stop-color="#050608"/>
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="18%" r="72%">
          <stop offset="0" stop-color="#2563eb" stop-opacity=".22"/>
          <stop offset=".72" stop-color="#2563eb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#bg)"/>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#glow)"/>
      <rect x="${Math.round(size * 0.018)}" y="${Math.round(size * 0.018)}"
        width="${Math.round(size * 0.964)}" height="${Math.round(size * 0.964)}"
        rx="${Math.round(size * 0.205)}" fill="none"
        stroke="#ffffff" stroke-opacity=".08" stroke-width="${Math.max(1, Math.round(size * 0.012))}"/>
    </svg>
  `);

  const sWidth = Math.round(size * 0.45);
  const sHeight = Math.round((sWidth / letterS.width) * letterS.height);
  const arrowWidth = Math.round(size * 0.76);
  const arrowHeight = Math.round((arrowWidth / arrow.width) * arrow.height);
  const renderedS = await sharp(letterS.png)
    .resize(sWidth, sHeight, { fit: "fill" })
    .png()
    .toBuffer();
  const renderedArrow = await sharp(arrow.png)
    .resize(arrowWidth, arrowHeight, { fit: "fill" })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: background, left: 0, top: 0 },
      {
        input: renderedS,
        left: Math.round(size * 0.2),
        top: Math.round(size * 0.11),
      },
      {
        input: renderedArrow,
        left: Math.round(size * 0.12),
        top: Math.round(size * 0.66),
      },
    ])
    .png()
    .toBuffer();
}

async function build() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`ロゴ画像が見つかりません: ${SOURCE}`);
  }

  // 元画像の余白を除去（背景色は左上ピクセルから判定）
  const trimmed = await sharp(SOURCE).trim({ threshold: 12 }).png().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  console.log(`trimmed: ${width}x${height}`);

  for (const { file, size } of SQUARE_OUTPUTS) {
    const content = Math.round(size * CONTENT_RATIO);
    const margin = Math.round((size - content) / 2);

    await sharp(trimmed)
      .resize(content, content, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .extend({
        top: margin,
        bottom: size - content - margin,
        left: margin,
        right: size - content - margin,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(path.join(ROOT, file));

    console.log(`generated: ${file} (${size}x${size})`);
  }

  const transparent = await toTransparent(trimmed);
  fs.writeFileSync(path.join(ROOT, TRANSPARENT_OUTPUT), transparent);
  console.log(`generated: ${TRANSPARENT_OUTPUT} (${width}x${height}, 透過)`);

  const faviconMark = await createFaviconMark(await sharp(SOURCE).png().toBuffer());
  fs.writeFileSync(path.join(ROOT, FAVICON_MARK_OUTPUT), faviconMark);
  console.log(`generated: ${FAVICON_MARK_OUTPUT} (1024x1024)`);

  for (const { file, size } of FAVICON_OUTPUTS) {
    await sharp(faviconMark).resize(size, size).png().toFile(path.join(ROOT, file));
    console.log(`generated: ${file} (${size}x${size})`);
  }

  const icoPngs = [];
  for (const size of ICO_SIZES) {
    const data = await sharp(faviconMark)
      .resize(size, size)
      // ICO内のPNGはRGBAである必要がある（Next.jsのデコーダ要件）
      .ensureAlpha()
      .toColourspace("srgb")
      .png({ palette: false, compressionLevel: 9 })
      .toBuffer();

    icoPngs.push({ size, data });
  }

  fs.writeFileSync(path.join(ROOT, ICO_OUTPUT), buildIco(icoPngs));
  console.log(`generated: ${ICO_OUTPUT} (${ICO_SIZES.join("/")})`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
