const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads/')
    },
    filename:(req,file,callback)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalname = file.originalname;
        callback(null,uniqueSuffix+'-'+originalname)
    }
})

const isPDF = (req, file, callback) => {
    if (file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        callback(new Error('Only PDF files are allowed'));
    }
};
const upload=multer({
    storage:storage,
    fileFilter:isPDF
})

const uploadDocumentMiddleware = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors (e.g., file size exceeded)
        res.status(400).json({ error: err.message });
      } else if (err) {
        // Handle the custom file filter error (e.g., non-PDF file)
        res.status(400).json({ error: err.message });
      } else {
        // The file is uploaded and validated
        next();
      }
    });
  };
  
  module.exports = uploadDocumentMiddleware;