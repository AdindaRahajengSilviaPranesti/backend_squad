var express = require('express');
const { getMaterial, getMaterialByDate, getType, getSupplier, getParameter, getDataAnalysisByDate, getDataChart } = require('../controllers/radarvisualController');
var router = express.Router();

router.get('/', getMaterial);
router.post('/', getMaterialByDate);
router.get('/getType', getType);
router.get('/getSupplier/:id', getSupplier);
router.get('/getParameter/:typeid/:id', getParameter);
router.post('/getDataAnalysisByDate',getDataAnalysisByDate);
router.post('/getDataChart',getDataChart);
module.exports = router;