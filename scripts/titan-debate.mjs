#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const question = process.argv.slice(2).join(' ').trim();
console.log(`POLLING: ${question}`);
// ... orchestration logic ...
