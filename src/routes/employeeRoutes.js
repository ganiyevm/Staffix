const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/",authMiddleware, EmployeeController.createEmployee); 

router.get("/employees", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id",authMiddleware, EmployeeController.deleteEmployee);

module.exports = router;
