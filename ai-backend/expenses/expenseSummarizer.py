from fastapi import APIRouter, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from .getexpense import get_expenses
import dotenv
import os
dotenv.load_dotenv()  # Load environment variables from .env file
gemini_key = os.getenv("GEMINIKEY")  # Get Gemini API key from

router = APIRouter()

# Changed to GET to match Node.js fetch default behavior
@router.get("/summarize-expenses")
async def summarize_expenses(id: str, month: str, year: str):
    
    # Fetch the expense data from the database, now passing month and year
    expenses = await get_expenses(id, month, year)

    if not expenses:
        return {"summary": "No expenses logged for this timeframe. Great job saving!"}

    # Convert the list of expenses into a string format for the model safely using .get()
    expenses_str = "\n".join([
        f"{expense.get('date')}: {expense.get('category')} - ${expense.get('amount')} ({expense.get('description')})" 
        for expense in expenses
    ])
    
    prompt = f"""
Analyze these expenses for {month}/{year}:
{expenses_str}

Provide a short, punchy summary in this exact format:
### Spending Pattern
(1-2 sentences summarizing the main theme)

### 💡 Quick Tip
(1 bullet point with a highly actionable tip for saving money)

Assume the currency is INR. Keep it under 50 words total. Do not include raw data or lists of expenses.
"""
    
    try:
        model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.7,  # Slightly lower temperature for more analytical/grounded financial advice
            api_key=gemini_key
        )
        
        
        # Use invoke() instead of calling the model directly
        response = model.invoke(prompt)
        
        return {"summary": response.content}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))