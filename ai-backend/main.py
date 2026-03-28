import os
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello from ai-backend!"}


@app.get("/health")
def read_health():
    return {"status": "healthy"}

@app.get("/first-endpoint")
def read_first_endpoint():
    return {"message": "Hello from the first endpoint!"}

if __name__ == "__main__":
    pass