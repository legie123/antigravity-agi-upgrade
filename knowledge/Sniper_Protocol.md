# 🎯 Sniper Protocol (Contextual Precision)

The Sniper Protocol defines how an AI should interact with large codebases to maintain maximum context window efficiency.

## 1. Minimalist Patching
- **Never Rewrite**: Do not rewrite files larger than 100 lines.
- **Precision Targeting**: Use the `replace_file_content` tool with clear line ranges.
- **No Refactoring Side-Effects**: Only modify what is requested. 

## 2. Resource Management
- **Limited Extraction**: Use `tail`, `grep`, or `jq` to extract only the necessary data snippets.
- **Zero-Noise Buffering**: Do not fill the context window with "empty" data (e.g., repeating imports or long boilerplate) unless strictly necessary for the logic.

## 3. High Integrity Edges
- Always verify the exact character sequence before applying a patch.
- Ensure that indentation levels are preserved with obsessive precision.
