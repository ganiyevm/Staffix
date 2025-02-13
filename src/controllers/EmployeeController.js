// const Employee = require("../models/Employee");  
// const EmployeeService = require("../services/EmployeeService.js");
// const asyncHandler = require("express-async-handler");

// const createEmployee = asyncHandler(async (req, res) => {
//   try {
//     const { firstName, lastName, email, position, salary, department, address } = req.body;
    
//     // EmployeeService orqali yaratish
//     const newEmployee = await EmployeeService.createEmployee({ firstName, lastName, email, position, salary, department, address });

//     res.status(201).json({ message: "Xodim muvaffaqiyatli yaratildi", employee: newEmployee });
//   } catch (error) {
//     res.status(500).json({ message: "Xodim yaratishda xatolik", error: error.message });
//   }
// });

// const getAllEmployees = asyncHandler(async (req, res) => {
//   const employees = await EmployeeService.getAllEmployees();
//   res.status(200).json(employees);
// });

// const getEmployeeById = asyncHandler(async (req, res) => {
//   const employee = await EmployeeService.getEmployeeById(req.params.id);
//   if (!employee) {
//     res.status(404);
//     throw new Error("Xodim topilmadi");
//   }
//   res.status(200).json(employee);
// });

// const updateEmployee = asyncHandler(async (req, res) => {
//   const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
//   if (!employee) {
//     res.status(404);
//     throw new Error("Xodim topilmadi");
//   }
//   res.status(200).json({ message: "Xodim ma'lumotlari yangilandi", employee });
// });

// const deleteEmployee = asyncHandler(async (req, res) => {
//   const employee = await EmployeeService.deleteEmployee(req.params.id);
//   if (!employee) {
//     res.status(404);
//     throw new Error("Xodim topilmadi");
//   }
//   res.status(200).json({ message: "Xodim o‘chirildi" });
// });

// module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };


const employeeService = require("../services/employeeService.js");

const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json({ employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Xodim yaratishda xatolik" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.render("employees", { employees });
  } catch (error) {
    res.status(500).json({ message: "Xodimlarni olishda xatolik" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Xodim topilmadi" });
    }
    res.render("employeeDetails", { employee });
  } catch (error) {
    res.status(500).json({ message: "Xodimni olishda xatolik" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Xodim topilmadi" });
    }
    res.status(200).json({ employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Xodimni yangilashda xatolik" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await employeeService.deleteEmployee(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Xodim topilmadi" });
    }
    res.status(200).json({ message: `Xodim o'chirildi: ${deletedEmployee.email}` });
  } catch (error) {
    res.status(500).json({ message: "Xodimni o'chirishda xatolik" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
