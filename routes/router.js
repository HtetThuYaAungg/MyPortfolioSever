const express = require("express");
const router = new express.Router();
const multer = require("multer");
const projects = require("../model/projectsSchema");
const moment = require("moment")

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});


// user register
router.post("/register",upload.single("photo"),async(req,res)=>{

    const {filename} = req.file;

    const {title,demo,code} = req.body;

    if(!title || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    try {

        

        const projectdata = new projects({

            title:title,
            imgpath:filename,
            demo: demo,
            code:code,
        });

        const finaldata = await projectdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// project data get
router.get("/getdata",async(req,res)=>{
    try {
        const getProject = await projects.find();

        res.status(201).json({status:201,getProject})
    } catch (error) {
        res.status(401).json({ status: 401, error })
        
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProject = await projects.findByIdAndDelete({ _id: id });
        res.status(201).json({ status: 201, deleteProject });
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


module.exports = router;
