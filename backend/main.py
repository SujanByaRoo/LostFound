from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client, Client
from typing import Optional
import uuid
from sentence_transformers import SentenceTransformer

load_dotenv()

app = FastAPI(title="LostFound API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lazy supabase client
_supabase = None
def get_supabase() -> Client:
    global _supabase
    if _supabase is None:
        _supabase = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_SERVICE_KEY")
        )
    return _supabase

# Lazy embedding model
_model = None
def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model

def generate_embedding(text: str) -> list:
    model = get_model()
    embedding = model.encode(text)
    return embedding.tolist()

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

        # Generate embedding from title + description + category
        text_to_embed = f"{title} {description} {category} {location}"
        embedding = generate_embedding(text_to_embed)

        data = {
            "type": type,
            "title": title,
            "description": description,
            "category": category,
            "location": location,
            "contact_email": contact_email,
            "date": date if date else None,
            "image_url": image_url,
            "status": "active",
            "embedding": embedding
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

@app.get("/match/{item_id}")
def match_item(item_id: str):
    try:
        # Get the item we want to match
        item_result = get_supabase().table("items").select("*").eq("id", item_id).execute()
        if not item_result.data:
            return {"status": "error", "error": "Item not found"}

        item = item_result.data[0]
        if not item.get("embedding"):
            return {"status": "error", "error": "Item has no embedding yet"}

        # Find opposite type to match against
        opposite_type = "lost" if item["type"] == "found" else "found"

        # Get all items of opposite type with embeddings
        candidates = get_supabase().table("items")\
            .select("*")\
            .eq("type", opposite_type)\
            .neq("id", item_id)\
            .execute()

        if not candidates.data:
            return {"status": "success", "matches": []}

        # Calculate cosine similarity
        import numpy as np
        item_embedding = np.array(eval(item["embedding"]) if isinstance(item["embedding"], str) else item["embedding"])
        
        matches = []
        for candidate in candidates.data:
            if candidate.get("embedding"):
                candidate_embedding = np.array(eval(candidate["embedding"]) if isinstance(candidate["embedding"], str) else candidate["embedding"])
                # Cosine similarity
                similarity = np.dot(item_embedding, candidate_embedding) / (
                    np.linalg.norm(item_embedding) * np.linalg.norm(candidate_embedding)
                )
                matches.append({
                    "item": candidate,
                    "score": round(float(similarity) * 100, 1)
                })

        # Sort by score descending, return top 3
        matches.sort(key=lambda x: x["score"], reverse=True)
        top_matches = matches[:3]

        return {"status": "success", "matches": top_matches}

    except Exception as e:
        return {"status": "error", "error": str(e)}