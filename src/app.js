const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes.js");
const authroutes = require("./routes/authRoutes.js");
const logger = require("../logs/logger.js");

const app = express();
app.use(express.json());  

// app.use((req, res, next) => {
//     logger.info(`So‘rov kelgan URL: ${req.method} ${req.originalUrl}`);
//     next();  
// });

app.use("/api/users", authroutes);

app.use("/api/employees", employeeRoutes);  

module.exports = app;
