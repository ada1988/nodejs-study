/**
 * Created by CZD on 2017/12/25 0025.
 */
var logger = require('../../../libs/logger.lib');
var productCommontsService = require('../../services/product.comments.service');


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