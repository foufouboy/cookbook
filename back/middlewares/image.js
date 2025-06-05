const multer = require("multer");
const path = require("path");

const  storage  =  multer . diskStorage ( { 
  destination : function  ( req ,  file ,  cb )  { 
    cb ( null ,  './img' ) 
  } , 
  filename : function  ( req ,  file ,  cb )  { 
    const  uniqueSuffix  =  Date . now ( )  +  '-'  +  Math . round ( Math . random ( )  *  1E9 ) 
    cb ( null ,  file . fieldname  +  '-'  +  uniqueSuffix ) 
  } 
} )

const stockage = multer.memoryStorage();

const  upload  =  multer ( {  storage : stockage  } )

module.exports = upload;