const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mytype = fileTypes.test(file.mytype)
  
  if(mytype && extname){
    return cb(null, true)
  }else{
    cb(new Error('Veuillez mettre une image valide !'))
  }

}

const stockage = multer.memoryStorage();

const upload = multer({ storage: stockage, limits: {fieldSize : 2* 1024 * 1024}, fileFilter })

module.exports = upload;