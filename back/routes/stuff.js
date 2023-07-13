const express = require ('express');
const router = express.Router();

const stuffCtrl = require ('../controllers/stuff');

router.post('/books', stuffCtrl.createBook);

router.get('/books', stuffCtrl.getAllBooks);

router.get('/books/:id', stuffCtrl.getOneBook);


  module.exports = router;