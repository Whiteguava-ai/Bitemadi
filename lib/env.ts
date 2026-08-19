import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

function envPaths() {
  const dirs = new Set<string>();
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    dirs.add(dir);
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  const files: string[] = [];
  for (const root of dirs) {
    files.push(join(root, ".env.local"), join(root, ".env"));
  }
  return files;
}

export function loadDotEnv() {
  for (const file of envPaths()) {
    if (!existsSync(file)) continue;
    try {
      let buf = readFileSync(file);
      if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
        buf = Buffer.from(buf.toString("utf16le"));
      }
      const src = buf.toString("utf8").replace(/^\uFEFF/, "");
      for (const line of src.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq < 1) continue;
        const name = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (name && value && !process.env[name]?.trim()) {
          process.env[name] = value;
        }
      }
    } catch {
      /* skip unreadable files */
    }
  }
}

export function envKey(name: string) {
  loadDotEnv();
  return process.env[name]?.trim() || "";
}
