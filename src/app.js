const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");

const app = express();
app.use(express.json());  

app.use((req, res, next) => {
    console.log(`So‘rov kelgan URL: ${req.method} ${req.originalUrl}`);
    next();  
});

app.use("/api/users", userRoutes);

app.use("/api/employees", employeeRoutes);  

module.exports = app;
