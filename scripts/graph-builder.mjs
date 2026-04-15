#!/usr/bin/env node
import { readdirSync, statSync, existsSync } from 'fs';
import { resolve, relative, extname } from 'path';
const PROJECTS = { 'core': process.env.PROJECT_ROOT || '.' };
const CRITICAL_ENTITIES = [{ name: 'mexcClient', entityType: 'ExchangeClient', observations: ['Connects to MEXC API'] }];
console.log(JSON.stringify({ entities: CRITICAL_ENTITIES }, null, 2));
