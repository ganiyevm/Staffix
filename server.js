require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const logger = require("./logs/logger.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = require("./src/app.js");

app.use(express.json());

app.use(cors()); 
app.use(morgan("dev")); 
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Ishlayapti");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    await connectDB();
    logger.info(`Server ${PORT} portda ishga tushdi`);
  } catch (error) {
    logger.error("Serverni ishga tushirishda xato: " + error.message);
  }
});



