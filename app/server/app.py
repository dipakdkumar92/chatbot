import requests
from fastapi import FastAPI, WebSocket
from fastapi.websockets import WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

import json
app = FastAPI()

GPT3_API_KEY = config("GPT3_API_KEY")
api_endpoint = "https://api.openai.com/v1/chat/completions"

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}


class ChatConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(f"{message}")


manager = ChatConnectionManager()


@app.websocket("/chat")
async def chat_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            headers = {"Content-Type": "application/json",
                       "Authorization": f"Bearer {GPT3_API_KEY}"}

            prompt = await websocket.receive_text()
            if prompt:
                data = {
                  "model": "gpt-3.5-turbo",
                  "messages": [{"role": "user", "content": prompt}]
                }
                response = requests.post(api_endpoint, headers=headers, json=data)

                if response.status_code != 200:
                    await manager.broadcast("error")
                else:
                    response_json = json.loads(response.content.decode('utf-8'))
                    generated_text = response_json["choices"][0]["message"]['content']
                    await manager.broadcast(generated_text)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
