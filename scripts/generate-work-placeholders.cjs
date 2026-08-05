const fs = require("fs");
const path = require("path");

const projects = [
  {
    id: "alpha-kanko",
    title: "アルファ管工",
    subtitle: "Homepage",
    accent: "#2563eb",
    tone: "#0f172a",
  },
  {
    id: "kensapo",
    title: "KenSapo",
    subtitle: "Field Management",
    accent: "#1d4ed8",
    tone: "#111827",
  },
  {
    id: "drawstock",
    title: "DrawStock",
    subtitle: "Drawing Archive",
    accent: "#1e40af",
    tone: "#0b1220",
  },
  {
    id: "stark-lab",
    title: "Stark Lab",
    subtitle: "Brand Site",
    accent: "#0071e3",
    tone: "#1d1d1f",
  },
];

function cover({ title, subtitle, accent, tone }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="55%" stop-color="#eef2f7"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#glow)"/>
  <rect x="120" y="140" width="1360" height="720" rx="36" fill="url(#panel)" stroke="rgba(0,0,0,0.06)"/>
  <circle cx="160" cy="180" r="7" fill="#ff5f57"/>
  <circle cx="184" cy="180" r="7" fill="#febc2e"/>
  <circle cx="208" cy="180" r="7" fill="#28c840"/>
  <rect x="240" y="168" width="420" height="24" rx="12" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>
  <rect x="180" y="240" width="160" height="14" rx="7" fill="${accent}" fill-opacity="0.2"/>
  <rect x="180" y="280" width="520" height="28" rx="10" fill="${tone}" fill-opacity="0.12"/>
  <rect x="180" y="324" width="380" height="18" rx="9" fill="${tone}" fill-opacity="0.08"/>
  <rect x="180" y="380" width="700" height="280" rx="24" fill="${accent}" fill-opacity="0.1"/>
  <rect x="940" y="240" width="420" height="420" rx="28" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>
  <rect x="980" y="290" width="340" height="16" rx="8" fill="${tone}" fill-opacity="0.1"/>
  <rect x="980" y="330" width="280" height="16" rx="8" fill="${tone}" fill-opacity="0.08"/>
  <rect x="980" y="390" width="340" height="120" rx="18" fill="${accent}" fill-opacity="0.12"/>
  <rect x="980" y="540" width="160" height="44" rx="22" fill="${accent}"/>
  <text x="180" y="720" fill="${tone}" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">${title}</text>
  <text x="180" y="770" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600">${subtitle}</text>
</svg>`;
}

function desktop({ title, accent, tone }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img">
  <rect width="1600" height="1000" fill="#f5f5f7"/>
  <rect x="80" y="80" width="1440" height="840" rx="28" fill="#ffffff" stroke="rgba(0,0,0,0.08)"/>
  <rect x="80" y="80" width="1440" height="56" rx="28" fill="#f8fafc"/>
  <rect x="80" y="120" width="1440" height="16" fill="#f8fafc"/>
  <circle cx="120" cy="108" r="7" fill="#ff5f57"/>
  <circle cx="144" cy="108" r="7" fill="#febc2e"/>
  <circle cx="168" cy="108" r="7" fill="#28c840"/>
  <rect x="140" y="180" width="220" height="680" rx="18" fill="#f1f5f9"/>
  <rect x="400" y="180" width="1040" height="80" rx="16" fill="${accent}" fill-opacity="0.12"/>
  <rect x="420" y="208" width="280" height="24" rx="8" fill="${tone}" fill-opacity="0.16"/>
  <rect x="400" y="290" width="330" height="200" rx="18" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>
  <rect x="755" y="290" width="330" height="200" rx="18" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>
  <rect x="1110" y="290" width="330" height="200" rx="18" fill="#ffffff" stroke="rgba(0,0,0,0.06)"/>
  <rect x="400" y="520" width="1040" height="340" rx="18" fill="#f8fafc" stroke="rgba(0,0,0,0.05)"/>
  <text x="420" y="560" fill="${tone}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">${title} — Desktop</text>
</svg>`;
}

function mobile({ title, accent, tone }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="750" height="1400" viewBox="0 0 750 1400" role="img">
  <rect width="750" height="1400" fill="#eef2f7"/>
  <rect x="95" y="40" width="560" height="1320" rx="48" fill="#111827"/>
  <rect x="115" y="70" width="520" height="1260" rx="36" fill="#ffffff"/>
  <rect x="115" y="70" width="520" height="90" fill="${accent}" fill-opacity="0.12"/>
  <rect x="160" y="200" width="280" height="22" rx="11" fill="${tone}" fill-opacity="0.14"/>
  <rect x="160" y="250" width="420" height="16" rx="8" fill="${tone}" fill-opacity="0.08"/>
  <rect x="160" y="290" width="360" height="16" rx="8" fill="${tone}" fill-opacity="0.06"/>
  <rect x="160" y="350" width="420" height="220" rx="20" fill="${accent}" fill-opacity="0.12"/>
  <rect x="160" y="600" width="200" height="140" rx="18" fill="#f1f5f9"/>
  <rect x="380" y="600" width="200" height="140" rx="18" fill="#f1f5f9"/>
  <rect x="160" y="770" width="420" height="160" rx="18" fill="#f8fafc" stroke="rgba(0,0,0,0.05)"/>
  <rect x="230" y="980" width="280" height="52" rx="26" fill="${accent}"/>
  <text x="160" y="1120" fill="${tone}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">${title}</text>
  <text x="160" y="1160" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600">Mobile</text>
</svg>`;
}

for (const p of projects) {
  const dir = path.join(__dirname, "../public/works", p.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "cover.svg"), cover(p));
  fs.writeFileSync(path.join(dir, "desktop.svg"), desktop(p));
  fs.writeFileSync(path.join(dir, "mobile.svg"), mobile(p));
}

console.log("Generated work placeholder SVGs");
