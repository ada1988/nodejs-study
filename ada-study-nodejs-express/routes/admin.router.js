/**
 * Created by CZD on 2017/12/25 0025.
 */
var express = require('express');
var router = express.Router();
var productCommentsController = require("../node/business/controllers/admin/product.comments.controller");

router.get('/one',function(req,res,next){
    productCommentsController.one(req,res);
});
router.post('/saveOrUpdate',function(req,res,next){
    productCommentsController.saveOrUpdate(req,res);
});
/**
 * 导出对象
 */
module.exports = router;