/**
 * Created by CZD on 2017/12/25 0025.
 */
var ProductComments = require("../entitys/product.comments.entity");
var async = require("async");
var logger = require('../../../node/libs/logger.lib');
/**
 * 提取公用
 * @param err
 * @param result
 * @private
 */

exports.findById =  function (_id,callback) {
    ProductComments.findById({_id:_id}).lean().exec(function (err,result) {
        if(err){
            callback(err);
        }else if(result){
            callback(null,result);
        }else {
            callback(_id+' not found');
        }
    });
};;
exports.saveOrUpdate = function(data,callback){
    if (data._id){
        data.update_date = Date.now();
        ProductComments.update({_id: data._id}, data, function (err) {
            callback(err, data);
        });
    }else{
        new ProductComments(data).save(function (err,result){
            if(err){
                callback(err)
            }else{
                callback(null,result.toObject());
            }
        });
    }
}