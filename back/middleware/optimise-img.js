const sharp = require('sharp');
const fs = require ('fs');


const optimiseImg = ( req, res, next) =>{
    if ( req.file && req.file.path ) {
      const originImgPath = req.file.path;
      const replaceImgPath = req.file.path.replace(/\.[^.]+$/, '.webp');
        console.log(req);
      sharp(originImgPath)
        .toFormat('webp')
        .resize({
          width: 800,
          height: 800,
          fit: 'contain'
        })
        .toFile(replaceImgPath)
        .then(()=> {
          if(fs.existsSync(originImgPath)){
            fs.unlinkSync(originImgPath);
          }
        req.file.path = replaceImgPath.replace('images\\', '')
        next();
        });
    } else {
      next();
    }
  };
  
  module.exports.optimiseImg = optimiseImg;