// const express = require("express");
// const router = new express.Router();

// const projects = require("../model/projectsSchema");
// const moment = require("moment")

// // img storage path
// const imgconfig = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,"./uploads")
//     },
//     filename:(req,file,callback)=>{
//         callback(null,`imgae-${Date.now()}. ${file.originalname}`)
//     }
// })


// // img filter
// const isImage = (req,file,callback)=>{
//     if(file.mimetype.startsWith("image")){
//         callback(null,true)
//     }else{
//         callback(new Error("only images is allowd"))
//     }
// }

// const upload = multer({
//     storage:imgconfig,
//     fileFilter:isImage
// });


// // user register
// router.post("/register",upload.single("photo"),async(req,res)=>{

//     const {filename} = req.file;

//     const {title,demo,code} = req.body;

//     if(!title || !filename){
//         res.status(401).json({status:401,message:"fill all the data"})
//     }

//     try {

        

//         const projectdata = new projects({

//             title:title,
//             imgpath:filename,
//             demo: demo,
//             code:code,
//         });

//         const finaldata = await projectdata.save();

//         res.status(201).json({status:201,finaldata});

//     } catch (error) {
//         res.status(401).json({status:401,error})
//     }
// });


// // project data get
// router.get("/getdata",async(req,res)=>{
//     try {
//         const getProject = await projects.find();

//         res.status(201).json({status:201,getProject})
//     } catch (error) {
//         res.status(401).json({ status: 401, error })
        
//     }
// });


// router.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteProject = await projects.findByIdAndDelete({ _id: id });
//         res.status(201).json({ status: 201, deleteProject });
//     } catch (error) {
//         res.status(401).json({status:401,error})
//     }
// })
// module.exports = router;

const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const projects = require("../model/projectsSchema");
const multer = require('multer');


router.post('/project',upload.single('photo'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let project = new projects({
            title: req.body.title,
            imgpath: result.secure_url,
            demo: req.body.demo,
            code: req.body.code,
            cloudinary_id: result.public_id,
        });
        await project.save();

        res.json(project);
    } catch (err){
        console.log(err);
    }
})

// project data get
router.get("/getdata",async(req,res)=>{
    try {
        const getProject = await projects.find();

        res.status(201).json({ status: 201, getProject });
    } catch (error) {
        res.status(401).json({ status: 401, error })
        
    }
});

router.delete("/:id", async (req, res) => {
    try {
        //find id
        
        // const project = await projects.findById(req.params._id );
        const { id } = req.params;
        const project = await projects.findByIdAndDelete({ _id: id });
        
        //delete image cloudinary
        await cloudinary.uploader.destroy(project.cloudinary_id);

        res.status(201).json({ status: 201, project });
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projects.findById({ _id: id });

        await cloudinary.uploader.destroy(project.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            title: req.body.title || project.title,
            imgpath: result.secure_url || project.imgpath,
            demo: req.body.demo || project.demo,
            code: req.body.code || project.code,
            cloudinary_id: result.public_id || project.cloudinary_id,
        }
        project = await projects.findByAndUpdate({_id:id}, data, { new: true });
        res.status(201).json({ status: 201, project });
    } catch (err) {
        res.status(401).json({ status: 401, err })
    }
});



module.exports = router;
