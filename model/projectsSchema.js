const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    demo: {
        type:String,
        required:true
    },
    code: {
        type:String,
        required:true
    },
    cloudinary_id: {
        type:String
    }
    
});

//create model

const projects = new mongoose.model("projects", projectSchema);

module.exports = projects;