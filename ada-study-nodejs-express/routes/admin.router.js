/**
 * Created by CZD on 2017/12/25 0025.
 */
var express = require('express');
var router = express.Router();
var productCommentsController = require("../node/business/controllers/admin/product.comments.controller");

/**
 * 获取某条数据
 */
router.get('/one',function(req,res,next){
    productCommentsController.one(req,res);
});
/**
 * 保存、更新某条数据
 */
router.post('/saveOrUpdate',function(req,res,next){
    productCommentsController.saveOrUpdate(req,res);
});
/**
 * 分页查询
 */
router.get('/list',function(req,res,next){
    productCommentsController.list(req,res);
});

/**
 * 删除数据
 */
router.get('/del',function(req,res,next){
    productCommentsController.del(req,res);
});


/**
 * 标签 注册路由
 */
var wealthManagementerRouter = require('./wealth.managementer.router');
wealthManagementerRouter.registRout(router);
/**
 * 导出对象
 */
module.exports = router;