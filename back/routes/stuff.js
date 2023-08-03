const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require ('../controllers/stuff');



router.post('/', auth, multer, optimiseImg, stuffCtrl.createBook);
router.post('/:id/rating', auth, stuffCtrl.rateBook);
router.put('/:id', auth, multer, optimiseImg, stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.get('/', stuffCtrl.getAllBooks);
router.get('/:id', stuffCtrl.getOneBook);
router.get('/bestrating', stuffCtrl.bestRating);

module.exports = router;