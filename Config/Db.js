const mongoose=require('mongoose')
require('dotenv').config()

const DB_URI= "mongodb+srv://sajithvk04:FczbiqTch6d8q8wV@cluster0.dwqc2hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = mongoose.connect(DB_URI).then(()=>{
    console.log("DB connected");
}).catch((error)=>{
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
})

module.exports=connectDB;