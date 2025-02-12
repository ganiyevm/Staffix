const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const authenticateToken = require("../middlewares/authMiddleware");


const router = express.Router();
router.post("/",authenticateToken, EmployeeController.createEmployee); 

router.get("/employees", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id",authenticateToken, EmployeeController.deleteEmployee);

module.exports = router;
