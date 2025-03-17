#!/usr/bin/env python3
import sys
import json
import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

async def url_to_markdown(url: str) -> str:
    # Validate URL format
    if not url.startswith(('http://', 'https://', 'file://', 'raw:')):
        raise ValueError("Invalid URL format")

    browser_config = BrowserConfig(
        headless=True,
        verbose=True
    )
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS
    )
    
    try:
        async with AsyncWebCrawler(config=browser_config) as crawler:
            result = await crawler.arun(
                url=url,
                config=run_config
            )
            if not result or not result.markdown:
                raise RuntimeError("Failed to convert URL to markdown")
            return result.markdown.raw_markdown
    except Exception as e:
        # Re-raise any exceptions to be handled by the caller
        raise RuntimeError(f"Failed to convert URL to markdown: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "URL argument is required"}))
        sys.exit(1)
    
    url = sys.argv[1]
    result = asyncio.run(url_to_markdown(url))
    print(result)