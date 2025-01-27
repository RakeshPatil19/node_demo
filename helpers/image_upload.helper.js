
const path = require('path');
const multer  = require('multer');
const fs = require('fs');
const basePath = path.dirname(__dirname) + "/public/blog_images/";

   const imageStorage = multer.diskStorage({
     // Destination to store image     
     destination: 'public/blog_images',
     filename: (req, file, cb) => {
       cb(null, file.fieldname + '_' + Date.now()
         + path.extname(file.originalname))
     }
   });
   const imageUpload = multer({
     storage: imageStorage,
     limits: {
       fileSize: 10000000 // 1000000 Bytes = 1 MB
     },
     fileFilter(req, file, cb) {
       if (!file.originalname.match(/\.(png|jpg|jpeg|mp4)$/)) {
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
       cb(undefined, true)
     }
   });
   const deleteImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error("File path is required."));
      }
  
      // Check if the file exists before attempting to delete
      let filePath = basePath+file;
      fs.access(filePath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
          return reject(new Error("File does not exist or already deleted."));
        }
  
        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  };
  getImageResouceUrl =  (fileName) => {
      let server_url = process.env.SERVER_URL;
      let resourceUrl =
        server_url + '/blog_images/' + fileName;
      return resourceUrl;
  };
module.exports = {
  imageUpload,deleteImage,getImageResouceUrl,
};
