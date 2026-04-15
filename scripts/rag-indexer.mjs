#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, extname, relative } from 'path';

// Use environment variables for sensitive data
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_KEY) {
  console.error('❌ Missing environment variables. See .env.example');
  process.exit(1);
}

const PROJECTS = {
  'core': process.env.PROJECT_ROOT || '.',
};

const ALLOWED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md']);
const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

function chunkText(text, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + size));
    i += size - overlap;
  }
  return chunks;
}

function getFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  try {
    for (const item of readdirSync(dir)) {
      if (item.startsWith('.') || item === 'node_modules') continue;
      const full = resolve(dir, item);
      if (statSync(full).isDirectory()) {
        getFiles(full, files);
      } else if (ALLOWED_EXTENSIONS.has(extname(item))) {
        files.push(full);
      }
    }
  } catch {}
  return files;
}

async function getEmbedding(text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: text.slice(0, 8000) })
  });
  const data = await res.json();
  return data.data?.[0]?.embedding;
}

async function upsertToSupabase(records) {
  await fetch(`${SUPABASE_URL}/rest/v1/code_embeddings`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(records)
  });
}

const projectsToIndex = Object.entries(PROJECTS);
for (const [projectName, projectPath] of projectsToIndex) {
  const files = getFiles(projectPath);
  for (const filePath of files) {
    const content = readFileSync(filePath, 'utf8');
    const chunks = chunkText(content);
    const records = [];
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      if (embedding) records.push({ file_path: relative(projectPath, filePath), project: projectName, chunk_text: chunk, embedding: JSON.stringify(embedding) });
    }
    await upsertToSupabase(records);
  }
}
