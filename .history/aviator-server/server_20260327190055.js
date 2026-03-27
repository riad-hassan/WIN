// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());          // সব ডিভাইস থেকে এক্সেস
app.use(express.json());  // JSON parse করার জন্য

// 🔁 crash generate function
function generateCrash() {
  const r = Math.random();
  if (r < 0.89) return (1 + Math.random() * 2).toFixed(2);
  if (r < 0.94) return (1 + Math.random() * 4).toFixed(2);
  if (r < 0.99) return (1 + Math.random() * 6).toFixed(2);
  return (1 + Math.random() * 14).toFixed(2);
}

// 🔥 initial generate
let currentCrash = generateCrash();
let nextCrash = generateCrash();

// 🎮 Game app use করবে
app.get("/current", (req, res) => {
  res.json({ crashPoint: currentCrash });
});

// 🔮 Predictor app use করবে
app.get("/next", (req, res) => {
  res.json({ crashPoint: nextCrash });
});

// 🔁 round শেষ হলে call করবে
app.post("/consume", (req, res) => {
  currentCrash = nextCrash;
  nextCrash = generateCrash();
  console.log("New Round:", currentCrash);
  res.json({ ok: true });
});

// 💻 সব আইপিতে শোনাবে
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});