'user strict'
/**
 * Created by CZD on 2017/12/25 0025.
 */
var logger = require('../../../libs/logger.lib');
var productCommontsService = require('../../services/product.comments.service');

/**
 * 新增、保存
 * @param req
 * @param res
 */
exports.saveOrUpdate = function (req, res){
    req.checkBody({
        user:{
            notEmpty:true,
            errorMessage:'user not empty'
        }
    });
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.product.error('params errors ', result.array());
            return res.status(400).end();
        }

        var data = {
            _id:req.body._id,
            user:req.body.user,
            comments:req.body.comments,
            product:req.body.product==""?null:req.body.product,
            type:req.body.type,
            state:req.body.state,
            update_date:req.body.update_date,
            create_date:req.body.create_date,
            up:req.body.up
        };

        productCommontsService.saveOrUpdate(data,function(err){
            if (err) {
                logger.project.error('save error ', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
};

/**
 * 通过id，获取单条数据
 * @param req
 * @param res
 */
exports.one = function(req,res){
    req.checkQuery({
        _id:{
            notEmpty: true,
            errorMessage: '_id not empty'
        }
    });
    req.getValidationResult().then(function (result){
        if (!result.isEmpty()) {
            logger.project.error('params errors ', result.array());
            return res.status(400).end();
        }
        productCommontsService.findById(req.query._id,function(err,result){
           if(err){
               logger.project.error('object error', err);
               res.status(500).end();
           } else{
               res.status(200).json(result);
           }
        });
    });
}

exports.list = function(req,res){
    req.checkQuery(
        {
            'size':{
                optional: false,
                isInt: {errorMessage: 'size must be number'}
            } ,'index': {
                optional: false,
                isInt: {errorMessage: 'index must be number'}
            }
        });
    req.getValidationResult().then(function (value) {
        if(!value.isEmpty()){
            logger.system.error('params errors',value.array());
            return res.status(400).end();
        }
        var index = 1;
        var size = 20;
        if(req.query.index){
            index = parseInt(req.query.index);
        }
        if(req.query.size){
            size = parseInt(req.query.size);
        }
        var params = {};
        if(req.query.title){
            params.title = req.query.title;
        }

        productCommontsService.list(index,size,params,{state:'asc'},function(err,page){
            if(err){
                logger.system.error(err);
                res.status(500).end();
            }else{
                res.status(200).json(page);
            }
        });

    });
}


/**
 * 删除数据
 * @param req
 * @param res
 */
exports.del = function (req, res) {
    req.checkBody({
        '_id': {
            notEmpty: true,
            errorMessage: '_id not empty'
        }
    });
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.product.error('params errors ', result.array());
            return res.status(400).end();
        }
        var _id = req.body._id;

        //如果需要复杂操作，可以通过异步模块，实现不同类型事件的调用（如：async.series 串行）
        categoryService.del(_id, function (err, result) {
            if (err) {
                res.status(200).json({state: 0, msg: err});
            } else {
                res.status(200).json({state: 1, _id: _id});
            }
        });

    });
}