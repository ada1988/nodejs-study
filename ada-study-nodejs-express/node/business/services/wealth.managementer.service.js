/**
 * Created by CZD on 2017/12/26 0026.
 */
var WealthManagementer = require("../entitys/wealth.managementer.entity.js");
var async = require("async");
var Page = require('../commons/page');
var logger = require('../../libs/logger.lib');
var mongoose = require('mongoose');
var _ = require('lodash');
/**
 * 单条查询
 * @param _id
 * @param callback
 */
exports.findById=function (_id,callback) {
    WealthManagementer.findById(_id).lean().exec(function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,coverRes(200,result));
        }
    });
};
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
        WealthManagementer.find(query).sort(sort).skip(page.skip).limit(pageSize).lean().exec(
            function (err ,result){
                if(err){
                    callback(err);
                }else{
                    page.data = result;
                    callback(err,coverRes(200,page));
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
    WealthManagementer.count(query,callback);
}
/**
 * 修改、保存
 * @param entity
 * @param callback
 */
exports.saveOrUpdate = function (entity,callback) {
    if(entity._id){
        var _id = entity._id;
        delete entity._id;
        WealthManagementer.update({_id:_id},entity,function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,coverRes(200,result));
            }
        });
    }else{
        new WealthManagementer(entity).save(function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,coverRes(200,result));
            }
        });
    }
}
/**
 * 批量为客户打标签(标签集合中仅增加用户、未做删除用户的操作)
 * @param params
 * @param callback
 */
exports.addTagCustomers = function(params,callback){
    WealthManagementer.findOne({'_id':params.wealthManagementerId}).exec(function (err,result) {
        if(err){
            callback(err);
        }else{
            var customers = [];
            var tagIndex = -1;
            //已打过标签
            if(result._doc.m_tag_customers){
                tagIndex = _.findIndex(result._doc.m_tag_customers,{"tag_name":params.tagName});
                if(tagIndex>=0){
                    customers = result._doc.m_tag_customers[tagIndex].customers;
                }
            }
            //合并 集合
            for(var i=0;i<params.customers.length;i++){
                var id = coverObjectId(params.customers[i].custormerId);
                var name = params.customers[i].custormerName;
                var customerSearchId = {"customer_id":id};
                var index =  _.findIndex(customers,customerSearchId);
                var customer = {"customer_id":id,"customer_name":name};
                if(index < 0 ){
                    customers.push(customer);
                }else{
                    customers[index] = customer;
                }
            }
            //未打过标签
            if(tagIndex<0 ){
                WealthManagementer.update(
                    {'_id' : params.wealthManagementerId},
                    {'$addToSet':{'m_tag_customers':{'tag_name':params.tagName,'customers':customers},
                                    'm_tags':params.tagName
                                }
                    },function(err,result){
                        if(err){
                            callback(err);
                        }else{
                            callback(null,coverRes(200,result));
                        }
                    });
            }else{
                    //已打过标签：直接设置客户数组
                    var setFieldIndex = 'm_tag_customers.'+tagIndex+'.customers';
                    WealthManagementer.update(
                        {'_id' : params.wealthManagementerId},
                        {'$set':{[setFieldIndex]:customers}
                        },function(err,result){
                            if(err){
                                callback(err);
                            }else{
                                callback(null,coverRes(200,result));
                            }
                        });
            }
        }
    });
}
/**
 * 为客户移除标签
 * @param params
 * @param callback
 */
exports.removeTagCustomer = function(params,callback){
    WealthManagementer.findOne({'_id':params.wealthManagementerId}).exec(function (err,result) {
        if(err){
            callback(err);
        }else{
            var customers = [];
            var tagIndex = -1;
            //已打过标签
            if(result._doc.m_tag_customers){
                tagIndex = _.findIndex(result._doc.m_tag_customers,{"tag_name":params.tagName});
                if(tagIndex>=0){
                    customers = result._doc.m_tag_customers[tagIndex].customers;
                }
            }
            var index =  _.findIndex(customers,{'customer_id':coverObjectId(params.customerId)});
            if(index>=0){
                customers = _.remove(customers,{'customer_id':coverObjectId(params.customerId)});
                var setFieldIndex = 'm_tag_customers.'+tagIndex+'.customers';
                WealthManagementer.update(
                    {'_id' : params.wealthManagementerId},
                    {'$set':{[setFieldIndex]:customers}
                    },function(err,result){
                        if(err){
                            callback(err);
                        }else{
                            callback(null,coverRes(200,result));
                        }
                    });
            }else{
                callback(null,coverRes(200,result));
            }

        }
    });

}
/**
 * 删除
 * @param _id
 * @param callback
 */
exports.del=function (_id,callback) {
    WealthManagementer.remove({_id:_id},function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,coverRes(200,result));
        }
    });
};

/**
 * 新增 客户时，关联自己的财富管理人
 */
exports.addCustomer = function(params,callback){
    WealthManagementer.update(
        {'_id' : params.wealthManagementerId},
        {
            '$addToSet':{
                'mine_customers':
                    {
                        'customer_id': coverObjectId(params.customerId),
                        'customer_name':params.customerName
                    }
            }
        },
        function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,coverRes(200,result));
            }
        });
}

/**
 * 删除 客户时，删除关联的财富管理人
 */
exports.removeCustomer = function(params,callback){
    WealthManagementer.update(
        {'_id' : params.wealthManagementerId},
        {
            '$pull':{
                'mine_customers':
                    {
                        'customer_id':coverObjectId(params.customerId),
                        'customer_name':params.customerName
                    }
            }
        },
        function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,coverRes(200,result));
            }
        });
}

/**
 * 将String装ObjectId对象
 * @param _id
 */
function coverObjectId(_id){
    return mongoose.Types.ObjectId(_id);
}
/**
 * 我的客户
 * @param params
 * @param callback
 */
exports.mineCustomers = function(params,callback){
    WealthManagementer.findOne({'_id':params._id},'mine_customers').exec(function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,coverRes(result));
        }
    });
}


/**
 *我的标签
 * @param params
 * @param callback
 */
exports.tagsGroup = function(params,callback){
    WealthManagementer.findOne({'_id':params._id},'m_tag_customers').exec(function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,coverRes(200,result));
        }
    });
}

/**
 * 强转实体
 * @param object
 * @returns {{status: number, msg: null, data: Array}}
 */
function tagsGroupCover(object){
    var datas = [];

   var tagCustomers = object._doc.m_tag_customers;
   if(tagCustomers.length>0){
       for(var i=0;i<tagCustomers.length;i++){
           var count = tagCustomers[i].customers.length;
           var tagName = tagCustomers[i].tag_name;
           var name = "";
           for(var j = 0;j<tagCustomers[i].customers.length;j++){
               if(j==0){
                   name=tagCustomers[i].customers[j].customer_name;
               }else{
                   name=name+","+tagCustomers[i].customers[j].customer_name;
               }
           }
           var data = {tagName:tagName,count:count,names:name};
           datas.push(data);
       }
   }
    return coverRes(200,datas);
}

/**
 * 公用返回
 * @param data
 * @returns {{status: number, msg: null, data: *}}
 */
function coverRes(status,data){
    var result = {
        status:status,
        msg:null,
        data:data
    }
    return result;
}