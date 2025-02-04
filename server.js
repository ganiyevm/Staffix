require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); //(request) loglarini yozish uchun
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); //hozircha hamma domenga ruxsat beradi keyinchalik cheklov qoshamangit status
app.use(morgan("dev"));//loglarni toliq yozadi konsolga

// Root endpoint
app.get("/", (req, res) => {
  res.send("ishlayati");
});

// Port va serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(); // MongoDB bilan ulanish
  console.log(` Server ${PORT} portda ishga tushdi`);
});
