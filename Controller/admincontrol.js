const Employee = require("../Model/employeemodel");


const addEmployee = async (req, res) => {
    try {
      const {
        personalDetails,
        educationDetails,
        companyDetails
      } = req.body;
      const existingEmployee = await Employee.findOne({
        $or: [
          { 'personalDetails.email': personalDetails.email },
          { 'personalDetails.phone': personalDetails.phone }
        ]
      });
      if (existingEmployee) {
        return res.status(400).json({
          message: "Employee with this email or phone number already exists."
        });
      }
      const newEmployeeData = {
        personalDetails,
        education: educationDetails,
        employment: {
          position: companyDetails.position,
          department: companyDetails.department,
          dateOfJoining: companyDetails.dateOfJoining,
          salaryAmount:companyDetails.salaryAmount,
           
        }
      };
      const newEmployee = new Employee(newEmployeeData);
      await newEmployee.save();
      res.status(201).json({ message: "Employee successfully added" });
    } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({ message: "Error adding employee. Please try again." });
    }
  };

  const fetch_Employees = async (req, res) => {
    try {
      const employees = await Employee.find({});
      if (!employees.length) {
        return res.status(404).json({ message: "No employees found." });
      }
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error Fetching employee:", error);
      res.status(500).json({ message: "Error Fetching employee. Please try again." });
    }
  };

  const delete_employee = async (req, res) => {
    try {
      const empid = req.params.id;
      const result = await Employee.findByIdAndDelete(empid);
      if (!result) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Error deleting employee. Please try again." });
    }
  };

  const edit_employee = async (req, res) => {
    try {
      const { empid, personalDetails, companyDetails, educationDetails } = req.body;
        console.log(companyDetails)
      if (!empid) {
        return res.status(400).json({ message: "Employee ID is required." });
      }
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: empid },
        {
          $set: {
            personalDetails:personalDetails,
            employment:companyDetails,
            education:educationDetails
          }
        },
        { new: true, runValidators: true } 
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      res.status(200).json({ message: "Employee updated successfully." });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Error updating employee. Please try again." });
    }
  };
module.exports = { 
    addEmployee,
    fetch_Employees,
    delete_employee,
    edit_employee
 };
