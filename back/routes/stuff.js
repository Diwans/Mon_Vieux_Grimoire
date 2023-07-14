const express = require ('express');
const router = express.Router();

const stuffCtrl = require ('../controllers/stuff');

router.post('/', stuffCtrl.createBook);
router.get('/', stuffCtrl.getAllBooks);
router.get('/:id', stuffCtrl.getOneBook);


module.exports = router;