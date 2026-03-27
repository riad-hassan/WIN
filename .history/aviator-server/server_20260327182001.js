const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let currentCrash = null;
let nextCrash = null;

// 🎯 crash generate function
function generateCrash() {
  const r = Math.random();

  if (r < 0.89) {
    return (1 + Math.random() * 2).toFixed(2);
  } else if (r < 0.94) {
    return (1 + Math.random() * 4).toFixed(2);
  } else if (r < 0.99) {
    return (1 + Math.random() * 6).toFixed(2);
  } else {
    return (1 + Math.random() * 14).toFixed(2);
  }
}

// 🔥 initial generate
currentCrash = generateCrash();
nextCrash = generateCrash();

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

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});