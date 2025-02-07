const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");

// Xodim yaratish (POST)
router.post("/", EmployeeController.createEmployee);

// Boshqa route'lar (GET, PUT, DELETE)
router.get("/employees", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
