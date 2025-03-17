# Web Whale

A Discord bot that automatically converts webpage URLs to markdown and stores them in Google Cloud Storage.

## Features

- Automatically detects URLs in Discord messages
- Converts webpage content to markdown format
- Uploads markdown files to Google Cloud Storage
- Provides public links to the converted content

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

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Add your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- Configure your Google Cloud Storage settings

4. Set up Google Cloud:
- Create a Google Cloud project
- Create a service account and download the credentials JSON file
- Create a Google Cloud Storage bucket
- Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your credentials file

5. Build and run:
```bash
npm run build
npm start
```

## Usage

1. Invite the bot to your Discord server
2. Send a message containing a URL
3. The bot will automatically:
   - Detect the URL
   - Convert the webpage to markdown
   - Upload it to Google Cloud Storage
   - Reply with a link to the converted content

## Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token
- `GCS_BUCKET_NAME`: Name of your Google Cloud Storage bucket
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Google Cloud service account credentials JSON file

## Development

1. Install dependencies:
```bash
npm install
```

2. Start in development mode:
```bash
npm run dev
```

## License

MIT