const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes.js");
const authroutes = require("./routes/authRoutes.js");
const logger = require("../logs/logger.js");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",  // Umumiy layoutni tanlash
    layoutsDir: path.join(__dirname, 'views/layouts')  // Layout fayllari
}));
app.set("view engine", "hbs");

app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use("/", authroutes);  
app.use("/employees", employeeRoutes);

app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).send('Internal server error');
});

module.exports = app;
