var express = require('express');
const { 
    getAllFinding
} = require('../controllers/genbaController');
var router = express.Router();


router.get('/get-all-finding', getAllFinding);

module.exports = router;