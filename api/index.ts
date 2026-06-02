import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.js";
import preferencesRoutes from "../src/routes/preferences.js";
import feedRoutes from "../src/routes/feed.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/preferences", "/preferences"], preferencesRoutes);
app.use(["/api/feed", "/feed"], feedRoutes);

app.get(["/api/health", "/health"], (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  console.log(`Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Rota não encontrada no Express", path: req.url });
});

export default app;
