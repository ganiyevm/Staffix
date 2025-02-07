require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); 
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const logger = require("./logs/logger");

const app = require("./src/app.js");  


app.use(express.json());  
app.use(cors());          // hozircha barcha domainlarga ruxsat
app.use(morgan("dev"));   

// Root endpoint
app.get("/", (req, res) => {
  res.send("ishlayati");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    await connectDB();
    logger.info(`Server ${PORT} portda ishga tushdi`);  
    console.log(`Server ${PORT} portda ishga tushdi`);
  } catch (error) {
    logger.error("Serverni ishga tushirishda xato: " + error.message);  
    console.error("Serverni ishga tushirishda xato:", error);
  }
});

