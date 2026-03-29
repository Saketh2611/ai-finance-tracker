import os
import uvicorn
from fastapi import FastAPI
from expenses.expenseSummarizer import router as expense_router

# 1. Initialize the app FIRST
app = FastAPI()

# 2. Include the router AFTER the app is created
app.include_router(expense_router)

@app.get("/")
def read_root():
    return {"message": "Hello from ai-backend!"}

@app.get("/health")
def read_health():
    return {"status": "healthy"}

# 3. (Optional but recommended) Set up Uvicorn so you can run the file directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)