import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "❌ DATABASE_URL não está definida! Adicione ao arquivo .env:\n" +
    "   DATABASE_URL=postgresql://postgres:password@host:5432/database"
  );
}

// Pool de conexão otimizado para Vercel Serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  // Configurações otimizadas para serverless
  connectionTimeoutMillis: 5000,
  query_timeout: 30000,
  max: 1, // Limite máximo de conexões simultâneas em serverless
  idleTimeoutMillis: 30000,
  application_name: "financial-news-ai",
});

pool.on("error", (err) => {
  console.error("❌ Erro no pool de conexão:", err);
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados");
});

export const db = drizzle(pool, { schema });

export * from "./schema.js";
