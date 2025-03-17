# Web Whale 🐋

A Discord bot that automatically converts webpage URLs to markdown format and stores them in Google Cloud Storage, making web content easily accessible and shareable within Discord channels.

## Features

- 🔍 Automatically detects URLs in Discord messages
- 📝 Converts webpage content to clean, readable markdown format
- ☁️ Securely stores converted content in Google Cloud Storage
- 🔗 Provides public, persistent links to the converted content
- 🔒 Channel-based access control for bot functionality
- ⚡ Fast and efficient TypeScript implementation

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Python 3.8 or higher
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- A Google Cloud project with Storage enabled
- A Google Cloud service account with Storage permissions

### Python Dependencies

The project uses Python for URL to markdown conversion. Install the required package:

```bash
pip install crawl4ai
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/e-jigsaw/web-whale.git
cd web-whale
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set the following variables:
- `DISCORD_TOKEN`: Your Discord bot token
- `ALLOWED_CHANNEL_IDS`: Comma-separated list of Discord channel IDs where the bot should operate
- `GCS_BUCKET_NAME`: Name of your Google Cloud Storage bucket
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Google Cloud service account key file

4. Set up Google Cloud:
- Create a project in [Google Cloud Console](https://console.cloud.google.com)
- Enable the Cloud Storage API
- Create a service account and download the credentials JSON file
- Create a Cloud Storage bucket
- Set appropriate permissions on the bucket

5. Build and run:
```bash
npm run build
npm start
```

## Development

The project includes several npm scripts for development:

```bash
# Start in development mode with hot reload
npm run dev

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Project Structure

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

### Key Components

- `src/services/converter.ts`: Handles URL to markdown conversion using Python script
- `src/services/messageHandler.ts`: Processes Discord messages and manages bot responses
- `src/python/url_to_markdown.py`: Python script using crawl4ai for webpage conversion
- `src/config/index.ts`: Environment variable configuration and validation
- `src/types/index.ts`: TypeScript type definitions for the project

## Testing

The project uses Vitest for testing. Tests can be run with:

```bash
npm test
```

## License

MIT License - See [LICENSE](LICENSE) for details