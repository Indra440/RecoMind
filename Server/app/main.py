from fastapi import FastAPI
from app.api.v1.router import api_router
app = FastAPI(title="RecoMind AI")


# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "Hello FastAPI 🚀"}

# @app.get("/health")
# def health_check():
#     return {"status": "OK"}


app.include_router(api_router, prefix="/api/v1")