#!/usr/bin/env node
import { existsSync } from 'fs';
const projectPath = process.env.PROJECT_ROOT || '.';
console.log(`✈️  PRE-FLIGHT CHECK: ${projectPath}`);
if (!existsSync(projectPath)) { console.error('Path not found'); process.exit(1); }
