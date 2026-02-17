from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
# from app.db.session import AsyncSessionLocal
# from app.services.scoring_service import calculate_score

class RecommendationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def recommend(self):
        # async with AsyncSessionLocal() as db:
            # query = text("""
            #     SELECT product_id,
            #            1 - (embedding <-> :vector) AS similarity,
            #            margin,
            #            stock_qty
            #     FROM products
            #     WHERE store_id = :store_id
            #     AND stock_qty > 0
            #     ORDER BY embedding <-> :vector
            #     LIMIT 20
            # """)
            # result = await db.execute(query, {
            #     "vector": session_vector,
            #     "store_id": store_id
            # })
            # rows = result.fetchall()


            query = text("""
                SELECT name 
                FROM TENANTS
                LIMIT 20
            """)
            print(query)
            result = await self.db.execute(query)
            rows = result.fetchall()

            print("rows"+rows)
            
            # scored = []
            # for row in rows:
            #     score = calculate_score(
            #         similarity=row.similarity,
            #         margin=row.margin,
            #         stock=row.stock_qty
            #     )
            #     scored.append((row.product_id, score))

            # scored.sort(key=lambda x: x[1], reverse=True)
            # return scored[:5]
