const multer = require('multer');
const sharp = require('sharp');
const fs = require ('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');


const optimiseImg = ( req, res, next) =>{
  if ( req.file && req.file.path ) {
    const originImgPath = req.file.path;
    const replaceImgPath = req.file.path.replace(/\.[^.]+$/, '.webp');

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