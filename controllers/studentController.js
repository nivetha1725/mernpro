const Student=require("../models/Student");
exports.createStudent=async(req,res)=>{
    try{

        const totalCount=await Student.countDocuments({});
        req.body['rollno']=1+totalCount

        const student=await Student.create(req.body);
        res.json(student);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};


exports.getAllStudents=async(req,res)=>{
try{
        const students=await Student.find();
        res.json(students);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.getStudent=async(req,res)=>{
    try{
       // const student1=await Student.findOne({rollno:req.params.rollno});
        const student1=await Student.findOne({name:req.params.r});
        res.json(student1);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.updateStudent=async(req,res)=>{
    try{
        //if we dont give new:true ,it will update but not show in the result ,it shows the existing data
        const student=await Student.findOneAndUpdate({rollno:req.params.id},req.body,{new:true});
        if(!student) return res.status(404).json({message:"Student not found"});
        res.json(student);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.deleteStudent=async(req,res)=>{
    try{
        const student=await Student.findOneAndDelete({rollno:req.params.id});
        if(!student) return res.status(404).json({message:"Student not found"});
        res.json({message:"Student deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};