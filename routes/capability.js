var express = require('express');
const { 
    getMstJenisPengujian,
    countCapability,
    dataTable
} = require('../controllers/capabilityController');
var router = express.Router();


router.get('/capability-al4-mst-jenispengujian', getMstJenisPengujian);
router.post('/count-capability', countCapability);
router.post('/data-table', dataTable);

module.exports = router;