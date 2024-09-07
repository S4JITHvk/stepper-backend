const express = require('express')
const router=express.Router()
const AdminControl=require("../Controller/admincontrol")
router.post("/addEmployee",AdminControl.addEmployee)
router.get("/fetchdetail",AdminControl.fetch_Employees)
router.delete("/delete_Employee/:id",AdminControl.delete_employee)
router.post("/editEmployee",AdminControl.edit_employee)
module.exports=router;