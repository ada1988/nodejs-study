/**
 * Created by CZD on 2017/12/25 0025.
 */
var ProductComments = require("../entitys/product.comments.entity");
var Product = require("../entitys/product.entity");
var async = require("async");
var logger = require('../../../node/libs/logger.lib');
var Page = require('../../../node/business/commons/page');
/**
 * 通过id获取单条数据
 * @param _id
 * @param callback
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
};
/**
 * 新增、保存操作
 * @param data
 * @param callback
 */
exports.saveOrUpdate = function(data,callback){
    if (data._id){
        data.update_date = Date.now();
        /**
         * update第一个参数是查询条件，第二个参数是更新的对象，但不能更新主键，这就是为什么要删除主键的原因
         */
        var _id = data._id; //需要取出主键_id
        delete data._id;    //再将其删除

        ProductComments.update({_id: _id}, data, function (err) {
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

/**
 * 分页查询
 * @param pageNo
 * @param pageSize
 * @param query
 * @param sort
 * @param callback
 */
exports.list = function (pageNo,pageSize,query,sort,callback){
    async.waterfall([function(callback){
        exports.count(query,callback);
    },function(count,callback){
        var page = new Page(pageNo,pageSize,count);
        //populate(外键对象，对象属性集合)
        ProductComments.find(query).populate('product',['title','no']).sort(sort).skip(page.skip).limit(pageSize).lean().exec(
            function (err ,result){
                if(err){
                    callback(err);
                }else{
                    page.data = result;
                    callback(err,page);
                }
            }
        );
    }],callback);
};

/**
 * 查询总数
 * @param query
 * @param callback
 */
exports.count = function (query,callback){
    ProductComments.count(query,callback);
}

/**
 * 删除数据
 * @param model
 * @param callback
 */
exports.del=function (_id,callback) {
    ProductComments.remove({_id:_id},callback);
}

