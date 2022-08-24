const multer = require('multer')
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public");
    }, 
    
    filename: (req,file,cb) => cb(null, new Date().toISOString().replace(/:/g,"_") + file.originalname)
})
const upload = multer({storage:storage,fileFilter:fileFilter})
module.exports = upload;
//forces