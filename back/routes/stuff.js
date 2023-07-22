const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require ('../controllers/stuff');


router.post('/api/books', auth, multer, stuffCtrl.createBook);
router.get('/api/books', stuffCtrl.getAllBooks);
router.get('/api/books/:id', stuffCtrl.getOneBook);

module.exports = router;