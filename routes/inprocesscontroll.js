var express = require('express');
const { getFsb } = require('../controllers/inprocesscontrolController');
var router = express.Router();


router.post('/getFsb', getFsb);


module.exports = router;