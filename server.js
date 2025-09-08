const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Sajikan file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint untuk menerima log
app.post("/log", (req, res) => {
  const logMessage = `[${new Date().toISOString()}] ${req.body.message}\n`;
  console.log(logMessage.trim());

  // Simpan ke file logs.txt
  fs.appendFile("logs.txt", logMessage, (err) => {
    if (err) console.error("Gagal menyimpan log:", err);
  });

  res.json({ status: "ok" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
