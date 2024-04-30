var express = require('express');
const { getAbnormal, getAbnormality, getArrival, getRateabnormal, getAbnormalByPlan, getClosing, getFeedback, getEffectiveness, getDowntime, getCuscomplain, getIssue, getHistorical } = require('../controllers/capaTrackerController');
var router = express.Router();

router.get('/getAbnormal', getAbnormal);
router.get('/getAbnormal/:plan', getAbnormalByPlan);
router.post('/getArrival', getArrival);
router.post('/getAbnormality', getAbnormality);
router.post('/getRateabnormal', getRateabnormal);
router.post('/getFeedback', getFeedback);
router.post('/getEffectiveness', getEffectiveness);
router.post('/getDowntime', getDowntime);
router.post('/getCuscomplain', getCuscomplain);
router.post('/getIssue', getIssue);
router.post('/getClosing', getClosing);
router.post('/getHistorical', getHistorical);


module.exports = router;