# Security Scanner

An automated security scanning tool for codebases.

## Features

- Secret detection
- SQL injection scanning
- XSS vulnerability detection
- File system scanning
- Report generation

## Tech Stack

- **Language**: Node.js
- **File System**: Native fs module

## Project Structure

\`\`\`
security-scanner/
├── src/
│   ├── scanner.js       # Core scanner
│   ├── utils/           # Report generator
│   └── index.js         # API server
└── package.json
\`\`\`

## Usage

\`\`\`bash
# CLI
npm run scan

# API Server
npm start
\`\`\`

## API Endpoints

- \`POST /scan\` - Scan directory for vulnerabilities

---

**POWERED BY L8AB SYSTEMS**
