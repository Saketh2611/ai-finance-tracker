import logging
from pymongo import AsyncMongoClient
from bson import ObjectId # Required if your userId is stored as an ObjectId
import dotenv
import os
dotenv.load_dotenv()  # Load environment variables from .env file
mongouri = os.getenv("MONGODB_URI")  # Get MongoDB URI from environment variable

logger = logging.getLogger(__name__)

async def get_expenses(user_id: str, month: str, year: str):
    try:
        uri = mongouri
        client = AsyncMongoClient(uri)

        database = client["test"]
        collection = database["expenses"]

        # Note: If Mongoose stores userId as an ObjectId, wrap it: ObjectId(user_id)
        # If it's a string, leave it as user_id
        query = { "userId": user_id } 

        cursor = collection.find(query)
        
        # You must await the cursor to convert it into a list before closing the connection
        results = await cursor.to_list(length=None)

        await client.close()
        
        # Optional: Filter by month and year if you aren't doing it in the MongoDB query
        # Assuming expense['date'] is stored as a string like "YYYY-MM-DD"
        filtered_results = [
            exp for exp in results 
            if str(exp.get('date', '')).startswith(f"{year}-{month.zfill(2)}")
        ]
        
        return filtered_results

    except Exception as e:
        logger.error(f"Database error: {e}")
        raise Exception("The following error occurred: ", e)