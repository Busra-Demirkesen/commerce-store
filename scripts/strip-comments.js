

const fs = require('fs');
const path = require('path');

const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css']);

function stripComments(source) {
  const s = source;
  let out = '';
  let i = 0;
  const n = s.length;

  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inBlock = false;
  let inLine = false;

  while (i < n) {
    const ch = s[i];
    const next = i + 1 < n ? s[i + 1] : '';

    if (inLine) {
      if (ch === '\n') {
        inLine = false;
        out += ch;
      }
      i++;
      continue;
    }
    if (inBlock) {
      if (ch === '*' && next === '/') {
        inBlock = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    if (inSingle) {
      if (ch === '\\') {
        out += ch;
        if (i + 1 < n) out += s[i + 1], i += 2; else i++;
        continue;
      }
      if (ch === '\'') {
        inSingle = false;
      }
      out += ch;
      i++;
      continue;
    }
    if (inDouble) {
      if (ch === '\\') {
        out += ch;
        if (i + 1 < n) out += s[i + 1], i += 2; else i++;
        continue;
      }
      if (ch === '"') {
        inDouble = false;
      }
      out += ch;
      i++;
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') {
        out += ch;
        if (i + 1 < n) out += s[i + 1], i += 2; else i++;
        continue;
      }
      if (ch === '`') {
        inTemplate = false;
        out += ch;
        i++;
        continue;
      }
      out += ch;
      i++;
      continue;
    }

    
    if (ch === '/' && next === '/') {
      
      inLine = true;
      i += 2;
      continue;
    }
    if (ch === '/' && next === '*') {
      
      inBlock = true;
      i += 2;
      continue;
    }

    if (ch === '\'') {
      inSingle = true;
      out += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      out += ch;
      i++;
      continue;
    }
    if (ch === '`') {
      inTemplate = true;
      out += ch;
      i++;
      continue;
    }

    out += ch;
    i++;
  }
  return out;
}

function shouldProcess(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return false;
  if (file.includes('test-results')) return false;
  if (file.includes(`${path.sep}e2e${path.sep}`)) return false;
  if (file.includes(`${path.sep}node_modules${path.sep}`)) return false;
  return true;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      // Skip external or build dirs
      if (e.name === 'node_modules' || e.name === '.next' || e.name === 'test-results' || e.name === 'playwright-report') continue;
      walk(p);
    } else if (e.isFile() && shouldProcess(p)) {
      const orig = fs.readFileSync(p, 'utf-8');
      const stripped = stripComments(orig);
      if (stripped !== orig) {
        fs.writeFileSync(p, stripped, 'utf-8');
      }
    }
  }
}

const root = process.cwd();
walk(root);
console.log('Comments stripped.');
