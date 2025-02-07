const employees = require("../models/Employee");  
const EmployeeService = require("../services/EmployeeService.js");
const asyncHandler = require("express-async-handler");

createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, position, salary, department } = req.body;
    const newEmployee = new employees({ firstName, lastName, email, position, salary, department });
    await newEmployee.save();  

    res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};


const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await EmployeeService.getAllEmployees();
  res.status(200).json(employees);
});


const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.getEmployeeById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Xodim topilmadi");
  }
  res.status(200).json(employee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
  if (!employee) {
    res.status(404);
    throw new Error("Xodim topilmadi");
  }
  res.status(200).json({ message: "Xodim ma'lumotlari yangilandi", employee });
});


const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.deleteEmployee(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Xodim topilmadi");
  }
  res.status(200).json({ message: "Xodim o‘chirildi" });
});

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };
