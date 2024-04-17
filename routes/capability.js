var express = require('express');
const { 
    getMstJenisPengujian,
    countCapability
} = require('../controllers/capabilityController');
var router = express.Router();


router.get('/capability-al4-mst-jenispengujian', getMstJenisPengujian);
router.post('/count-capability', countCapability);

module.exports = router;