import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.js";
import preferencesRoutes from "../src/routes/preferences.js";
import feedRoutes from "../src/routes/feed.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/feed", feedRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
