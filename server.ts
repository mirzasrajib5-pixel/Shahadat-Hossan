import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "K-Kids Korean Learning Server running" });
  });

  // High-fidelity natural TTS audio streaming route
  app.get("/api/tts", async (req, res) => {
    try {
      const text = (req.query.text as string || "").trim();
      const lang = (req.query.lang as string || "ko").trim();

      if (!text) {
        return res.status(400).json({ error: "Missing text query parameter" });
      }

      // Limit length for safe voice streaming
      const sanitizedText = text.slice(0, 200);
      const targetLang = lang.startsWith("bn") ? "bn" : "ko";
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(sanitizedText)}`;

      const response = await fetch(ttsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://translate.google.com/",
          "Accept": "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: "TTS upstream error", status: response.status });
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Content-Length", buffer.length);
      return res.send(buffer);
    } catch (err: any) {
      console.error("TTS Proxy error:", err);
      return res.status(500).json({ error: "Failed to generate TTS audio", details: err?.message });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
