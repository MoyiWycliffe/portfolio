from fastapi import FastAPI, Request
from backend.database import supabase
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Visit(BaseModel):
    pageurl: str
    statuscode: int
    useragent: str
    referrer: str


@app.post("/visit")
async def add_visit(visit: Visit, request: Request):

    client_ip = request.client.host  # 🔥 THIS is the correct way

    insert_result = supabase.table("myportfolio_page_visits").insert({
        "pageurl": visit.pageurl,
        "statuscode": visit.statuscode,
        "ipaddress": client_ip,
        "useragent": visit.useragent,
        "referrer": visit.referrer
    }).execute()

    result = supabase.table("myportfolio_page_visits").select("*").execute()

    return {
        "message": "Data inserted successfully 🚀",
        "ip": client_ip,
        "inserted": insert_result.data,
        "all_rows": result.data
    }