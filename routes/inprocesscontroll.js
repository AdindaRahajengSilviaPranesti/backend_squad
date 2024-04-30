var express = require('express');
const { getFsb, getResult } = require('../controllers/inprocesscontrolController');
var router = express.Router();


router.post('/getFsb', getFsb);
router.post('/', getResult);

module.exports = router;