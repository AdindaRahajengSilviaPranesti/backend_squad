var express = require('express');
const { 
    getAllFindingCross,
    getAllFindingSelf,
    getAllFindingArea,
} = require('../controllers/genbaController');
var router = express.Router();


router.get('/get-all-finding-cross', getAllFindingCross);
router.get('/get-all-finding-self', getAllFindingSelf);
router.get('/get-all-finding-area', getAllFindingArea);

module.exports = router;
