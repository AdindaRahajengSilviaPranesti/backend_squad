var express = require('express');
const { 
    getMstJenisPengujian,
    countCapability,
    dataTable,
    linechartCapability
} = require('../controllers/capabilityController');
var router = express.Router();


router.get('/capability-al4-mst-jenispengujian', getMstJenisPengujian);
router.post('/count-capability', countCapability);
router.post('/data-table', dataTable);
router.post('/linechart-capability', linechartCapability);

module.exports = router;