# 🤖 Antigravity AGI Upgrade Core

Modular framework for autonomous dev-ops, semantic memory, and multi-model decision logic.

## 📦 Modules

### 1. Vector RAG (Semantic Memory)
Uses Supabase and pgvector to index and query your codebase semantically.
- `scripts/rag-indexer.mjs`: Indexes files into embeddings.
- `scripts/rag-query.mjs`: Searches codebase using natural language.

### 2. Titan Debate Engine
Orchestrates a parallel debate between DeepSeek, OpenAI, and Gemini to find the optimal solution for complex problems.
- `scripts/titan-debate.mjs`

### 3. Self-Healing Watchdog
Monitors Google Cloud Run services and handles incidents automatically.
- `daemon/watchdog.sh`

### 4. Pre-Flight Simulator
Validates builds under resource constraints (RAM/CPU) before deploying to serverless environments.
- `scripts/preflight-check.mjs`

### 5. Knowledge Graph Builder
Builds a relationship map of your project modules in MCP Memory.
- `scripts/graph-builder.mjs`

## 🚀 Setup

1. Copy `.env.example` to `.env`.
2. Populate the API keys.
3. Run SQL migration (provided in `rag-query.mjs`) in your Supabase console.
