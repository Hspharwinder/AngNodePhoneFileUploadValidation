const multer = require('multer');

let filenameStore;
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'fileUploaded')
    },
    filename:function(req, file, cb){
        filenameStore = Date.now() + '_' + file.originalname;
        cb(null, filenameStore);
    }
})

const fileFilter = function(req, file, cb) {
    // Accept pdf only
    if (!file.originalname.match(/\.(pdf)$/)) {
        req.fileValidationError ='Please upload only pdf';
        return cb(new Error('Please upload only pdf'), false);
    }
    cb(null, true);
}

// return response file is uploaded or not
const pdfUpload = function (req, res) {
    // uploading file on server
    const upload = multer({ storage: storage, fileFilter:fileFilter }).single('file')
    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.status(422).json({ message: req.fileValidationError});
        }

        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(422).json({ message: err })
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(422).json({ message: err })
        }

        if (!req.file) {
            console.log("No file received");
            return res.status(422).json({ message: 'Please select an file to upload' })
        } else {
            console.log('file received');
            return res.status(200).json({ message: 'Successfully uploaded file' })
        }
      })
};
/***  Code End:: file Upload  ***/


module.exports = { pdfUpload }