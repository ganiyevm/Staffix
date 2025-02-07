const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      match: [/^[A-Za-z]+$/, "First name should only contain letters"],
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: "First name must be at least 2 characters long",
      },
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      match: [/^[A-Za-z]+$/, "Last name should only contain letters"],
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: "Last name must be at least 2 characters long",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [1, "Salary must be at least 1"],
      max: [100000000, "Salary must be less than 100000000 som"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["HR", "Engineering", "Marketing", "Sales", "Finance"],
        message: "Department must be HR, Engineering, Marketing, Sales, or Finance",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
