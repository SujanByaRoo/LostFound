from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client, Client
from typing import Optional
import uuid

load_dotenv()

app = FastAPI(title="LostFound API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lazy supabase client — only connects when first called
_supabase = None
def get_supabase() -> Client:
    global _supabase
    if _supabase is None:
        _supabase = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_SERVICE_KEY")
        )
    return _supabase

@app.get("/")
def root():
    return {"message": "LostFound API is alive! 🔥"}

@app.get("/health")
def health():
    return {"status": "healthy", "version": "1.0.0"}

@app.get("/test-db")
def test_db():
    try:
        result = get_supabase().table("items").select("*").limit(1).execute()
        return {"status": "Database connected! ✅", "data": result.data}
    except Exception as e:
        return {"status": "Error", "error": str(e)}

@app.post("/items")
async def create_item(
    type: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    location: str = Form(...),
    contact_email: str = Form(...),
    date: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    try:
        image_url = None

        if image:
            image_bytes = await image.read()
            file_ext = image.filename.split(".")[-1]
            file_name = f"{uuid.uuid4()}.{file_ext}"

            get_supabase().storage.from_("item-images").upload(
                file_name,
                image_bytes,
                {"content-type": image.content_type}
            )

            image_url = get_supabase().storage.from_("item-images").get_public_url(file_name)

        data = {
            "type": type,
            "title": title,
            "description": description,
            "category": category,
            "location": location,
            "contact_email": contact_email,
            "date": date if date else None,
            "image_url": image_url,
            "status": "active"
        }

        result = get_supabase().table("items").insert(data).execute()
        return {"status": "success ✅", "data": result.data}

    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.get("/items")
def get_items(type: Optional[str] = None):
    try:
        query = get_supabase().table("items").select("*").order("created_at", desc=True)
        if type:
            query = query.eq("type", type)
        result = query.execute()
        return {"status": "success", "data": result.data}
    except Exception as e:
        return {"status": "error", "error": str(e)}