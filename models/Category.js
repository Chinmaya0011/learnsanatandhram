const mongoose=require('mongoose');

const levelSchema=new mongoose.Schema({
    levelNumber:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
})

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    levels:[levelSchema],
})

const Category=mongoose.model("Category",categorySchema);
module.exports=Category;