const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');

const stuffCtrl = require ('../controllers/stuff');

router.post('/', auth, stuffCtrl.createBook);
router.get('/', stuffCtrl.getAllBooks);
router.get('/:id', stuffCtrl.getOneBook);


module.exports = router;