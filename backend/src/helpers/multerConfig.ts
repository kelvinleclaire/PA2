//Multer is  a package for handling files in a form
var multer  = require('multer')

const fs = require('fs')

// Multer Storage solution
let storage = multer.diskStorage({
  destination: function (req:any, file:any, cb: Function) {
    cb(null, './src/uploads/')
  },
  filename: function (req:any, file:any, cb: Function) {
    let originalFileName = file.originalname;
    let originalExtension = originalFileName.split('.')
    originalExtension = originalExtension[originalExtension.length -1]

    let n = 0;
    fs.readdir('./src/uploads/', (err:any, filesArray:[any]) => {
      try {
      console.log(filesArray.length)
      n = filesArray.length;
      } catch (e: any) {
        n = 0
      }
      cb(null, `inspplan_${n}.${originalExtension}`);
    });
  }
})

export const planUpload = multer({ dest: './src/uploads/' , storage: storage})
