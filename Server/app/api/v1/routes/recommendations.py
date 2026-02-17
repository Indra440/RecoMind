from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.recommendation_service import RecommendationService
from app.db.session import get_db
from sqlalchemy import text
import asyncpg
import asyncio

router = APIRouter()


@router.get("/")
async def get_recommendations(db: AsyncSession = Depends(get_db)):



    # async def test_conn():
    #     conn = await asyncpg.connect(
    #         user="postgres",
    #         password="recoMind@2k26!",
    #         database="postgres",
    #         host="db.gwwxvdhvlzjjfcdzniwf.supabase.co",
    #         port=5432,
    #         ssl=True
    #     )
    #     print("Connected successfully!")
    #     await conn.close()

    # asyncio.run(test_conn())






    query = text("""
                SELECT name 
                FROM TENANTS
                LIMIT 20
            """)
    print(query)
    print(db)
    result = await db.execute(query)
    items = result.scalars().all()
    # rows = result.fetchall()

    print("rows"+items)
    # service = RecommendationService(db)
    # result = await service.recommend()
    # return {"recommendations": result}

    # return {"message": "Hello FastAPI 🚀"}