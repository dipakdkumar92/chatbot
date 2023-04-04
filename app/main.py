import uvicorn
import asyncio


async def main():
    config = uvicorn.Config("server.app:app", port=8000, log_level="info", workers=4)
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())
