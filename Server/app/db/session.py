from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from sqlalchemy.orm import DeclarativeBase

print(settings.DATABASE_URL)
engine = create_async_engine(
    settings.DATABASE_URL,
    # # pool_size=10,
    # # max_overflow=20
    # echo=True,
    # # pool_pre_ping=True,
    connect_args={
        "ssl": True,
        # "family": 2  # 👈 Force IPv4
    }
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)
class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session