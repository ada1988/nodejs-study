/**
 * Created by CZD on 2017/12/25 0025.
 */
var express = require('express');
var router = express.Router();
var mdStatus = require('../node/constants/status.constant');

router.get('/',function(req,res,next){
    res.status(mdStatus.OK).json("成功");
});

module.exports = router;