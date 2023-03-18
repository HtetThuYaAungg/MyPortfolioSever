const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "do8dqa8zn",
    api_key: "981745913172982",
    api_secret: "07EXYYIX4bU_sJn-7_cYRN7zG5E"
});
  
module.exports = cloudinary;