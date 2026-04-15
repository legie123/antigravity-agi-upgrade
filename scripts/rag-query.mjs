#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('Usage: node rag-query.mjs "your question"');
  process.exit(1);
}

async function getEmbedding(text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: text })
  });
  const data = await res.json();
  return data.data?.[0]?.embedding;
}

const queryEmbedding = await getEmbedding(query);
const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_code_embeddings`, {
  method: 'POST',
  headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query_embedding: queryEmbedding, match_threshold: 0.75, match_count: 5 })
});
const results = await res.json();
console.log(JSON.stringify(results, null, 2));
