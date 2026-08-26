/** Safe Markdown → HTML (escape first) */
export function markdownToSafeHtml(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;
  let inCode = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${para.join(" ")}</p>`);
      para = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushPara();
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      if (inCode) {
        html.push("</code></pre>");
        inCode = false;
      } else {
        html.push("<pre><code>");
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      html.push(line);
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    const h2 = line.match(/^##\s+(.+)$/);
    const h1 = line.match(/^#\s+(.+)$/);
    const li = line.match(/^[-*]\s+(.+)$/);

    if (h1 || h2 || h3 || li || line.trim() === "") flushPara();

    if (h1) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h1 id="${slugify(h1[1])}">${inline(h1[1])}</h1>`);
    } else if (h2) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h2 id="${slugify(h2[1])}">${inline(h2[1])}</h2>`);
    } else if (h3) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h3 id="${slugify(h3[1])}">${inline(h3[1])}</h3>`);
    } else if (li) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inline(li[1])}</li>`);
    } else if (line.trim() === "") {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    } else {
      para.push(inline(line));
    }
  }
  flushPara();
  if (inList) html.push("</ul>");
  if (inCode) html.push("</code></pre>");
  return html.join("\n");
}

export function sanitizeStoredHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
}

export function slugifyHeading(text: string): string {
  return slugify(text);
}

function slugify(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u3040-\u30ff\u4e00-\u9fff-]/g, "")
    .slice(0, 64);
}

function inline(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:[^)]+|\/[^)]+)\)/g,
      '<a href="$2" rel="noopener">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
