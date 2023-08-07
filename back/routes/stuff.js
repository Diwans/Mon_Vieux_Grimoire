const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multerConfig = require('../middleware/multer-config');
const stuffCtrl = require ('../controllers/stuff');
const optimiseImg = require ('../middleware/optimise-img');



router.post('/', auth, optimiseImg.optimiseImg, multerConfig, stuffCtrl.createBook);
router.post('/:id/rating', auth, stuffCtrl.rateBook);
router.put('/:id', auth, optimiseImg.optimiseImg, multerConfig, stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.get('/bestrating', stuffCtrl.bestRating);
router.get('/', stuffCtrl.getAllBooks);
router.get('/:id', stuffCtrl.getOneBook);


module.exports = router;