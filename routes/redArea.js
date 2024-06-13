var express = require('express');
const { 
    getRedAll,
    getYellowAll,
    postTarget,
    postArea,
    postResultSwab
} = require('../controllers/redAreaController');
var router = express.Router();


router.get('/red-all-line', getRedAll);
router.get('/yellow-all-line', getYellowAll);
router.post('/target', postTarget);
router.post('/get-area', postArea);
router.post('/result-swab', postResultSwab);

module.exports = router;