var express = require('express');
const { getParameter, getProduct, getParameteroc, getProductoc, getTypeParameter, getPanalysisfsb, getTypeParameterOc,
     getTypeParameterOcWater, getProwaitingoc,
     getYearOc} = require('../controllers/finishGoodController');
var router = express.Router();

router.get('/getParameter', getParameter);
router.get('/getProduct/:kode_produk/:lotno', getProduct);
router.get('/getParameteroc', getParameteroc);
router.get('/getProductoc/:product/:lotno', getProductoc);
router.post('/getTypeParameter',getTypeParameter);
router.get('/getYearoc',getYearOc);
router.get('/getPanalysisfsb', getPanalysisfsb); //milik FSB -->progress&waiting approval
router.post('/getTypeParameterOc', getTypeParameterOc); // OCLINE --> Paramater & result
router.post('/getTypeParameterOcWater', getTypeParameterOcWater);  // OCLINE --> Water & result
router.get('/getProwaitingoc', getProwaitingoc); //milik OC --> progress & waiting approval
module.exports = router;