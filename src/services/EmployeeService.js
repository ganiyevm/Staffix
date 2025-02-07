const Employee = require("../models/Employee.js");
const logger = require("..//../logs/logger.js");


const createEmployee = async (employeeData) => {
  try {
    const employee = await Employee.create(employeeData);
    logger.info(`Yangi xodim qo‘shildi: ${employee.email}`);
    return employee;
  } catch (error) {
    logger.error(`Xodim yaratishda xatolik: ${error.message}`);
    throw error;
  }
};


const getAllEmployees = async () => {
  try {
    const employees = await Employee.find();
    logger.info("Barcha xodimlar olindi");
    return employees;
  } catch (error) {
    logger.error(`Xodimlarni olishda xatolik: ${error.message}`);
    throw error;
  }
};


const getEmployeeById = async (id) => {
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      logger.warn(`Xodim topilmadi: ID = ${id}`);
      return null;
    }
    logger.info(`Xodim topildi: ${employee.email}`);
    return employee;
  } catch (error) {
    logger.error(`Xodimni olishda xatolik: ${error.message}`);
    throw error;
  }
};


const updateEmployee = async (id, updateData) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    if (!employee) {
      logger.warn(`Yangilashda xodim topilmadi: ID = ${id}`);
      return null;
    }
    logger.info(`Xodim yangilandi: ${employee.email}`);
    return employee;
  } catch (error) {
    logger.error(`Xodimni yangilashda xatolik: ${error.message}`);
    throw error;
  }
};


const deleteEmployee = async (id) => {
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      logger.warn(`O‘chirishda xodim topilmadi: ID = ${id}`);
      return null;
    }
    logger.info(`Xodim o‘chirildi: ${employee.email}`);
    return employee;
  } catch (error) {
    logger.error(`Xodimni o‘chirishda xatolik: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
