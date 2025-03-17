---
name: repo
type: repo
agent: CodeActAgent
---

# Repository: e-jigsaw/web-whale

## Description

A Discord bot that automatically converts webpage URLs to markdown format and stores them in Google Cloud Storage, making web content easily accessible and shareable within Discord channels.

## Directory Structure

```
web-whale/
├── src/                    # Source code
│   ├── config/            # Configuration and environment setup
│   ├── python/            # Python scripts for URL to markdown conversion
│   ├── services/          # Core service implementations
│   │   └── __tests__/    # Service-specific tests
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   │   └── __tests__/   # Utility-specific tests
│   └── index.ts          # Application entry point
├── docs/                  # Documentation
│   ├── instruction.md    # Documentation guidelines
│   └── sessions/         # Session change documentation
├── dist/                 # Compiled JavaScript output
├── .env.example          # Example environment configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Components

- `src/services/converter.ts`: URL to markdown conversion service
- `src/services/messageHandler.ts`: Discord message processing
- `src/python/url_to_markdown.py`: Python-based webpage conversion
- `src/config/index.ts`: Environment configuration
- `src/types/index.ts`: TypeScript type definitions

## Setup

1. Prerequisites:
   - Node.js (v16+)
   - npm (v7+)
   - Python 3.8+
   - Discord bot token
   - Google Cloud project with Storage enabled
   - Google Cloud service account

2. Dependencies:
   ```bash
   # Install Node.js dependencies
   npm install

   # Install Python dependencies
   pip install crawl4ai
   ```

3. Environment Setup:
   - Copy `.env.example` to `.env`
   - Configure required environment variables:
     - `DISCORD_TOKEN`
     - `ALLOWED_CHANNEL_IDS`
     - `GCS_BUCKET_NAME`
     - `GOOGLE_APPLICATION_CREDENTIALS`

## Commands

```bash
# Development
npm run dev           # Start with hot reload
npm run build        # Build TypeScript
npm start           # Run production build

# Testing
npm test            # Run tests
npm run test:watch  # Watch mode
npm run test:coverage # Coverage report

# Linting
npm run lint        # Check code style
npm run lint:fix    # Fix code style
```

## Technologies

- **Backend**:
  - TypeScript
  - Node.js
  - Python (crawl4ai)
  - Discord.js v14.14.1
  - Google Cloud Storage

- **Testing**:
  - Vitest
  - ESLint

- **Infrastructure**:
  - Google Cloud Storage
  - Discord Bot API

## Guidelines

1. **Code Quality**:
   - Use TypeScript for type safety
   - Follow ESLint rules
   - Write tests for new features
   - Keep Python and TypeScript code separate

2. **Documentation**:
   - Document session changes in `docs/sessions/`
   - Follow `docs/instruction.md` format
   - Include frontmatter in session docs
   - Keep README.md updated

3. **Git Workflow**:
   - Create feature branches
   - Write conventional commits
   - Document changes in sessions
   - Run tests before PR

4. **Environment Variables**:
   - Never commit `.env` file
   - Update `.env.example` for new variables
   - Validate all env vars in config

5. **Error Handling**:
   - Handle Discord API errors gracefully
   - Validate URLs before processing
   - Log errors appropriately
   - Provide user-friendly error messages
