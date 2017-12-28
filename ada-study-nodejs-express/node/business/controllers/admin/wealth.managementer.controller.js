/**
 * Created by CZD on 2017/12/26 0026.
 */
var wealthManagementerService = require('../../services/wealth.managementer.service');
var logger = require('../../../libs/logger.lib');
var async = require('async');
/**
 * 保存财富管理人
 * @param req
 * @param res
 */
exports.create = function (req,res) {
    req.checkBody({
        aliasName: {
            notEmpty: true,
            errorMessage: 'aliasName 不能为空'
        },
        realName: {
            notEmpty: true,
            errorMessage: 'realName 不能为空'
        },
        idCard: {
            notEmpty: true,
            errorMessage: 'idCard 不能为空'
        },
        mSex: {
            notEmpty: true,
            errorMessage: 'mSex 不能为空'
        },
        mAge: {
            notEmpty: true,
            errorMessage: 'mAge 不能为空'
        },
        'mEmail': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
            },
            isEmail: {errorMessage: 'email 格式不正确'}
        },
        mPhone: {
            notEmpty: true,
            errorMessage: 'mPhone 不能为空'
        },
        mType: {
            notEmpty: true,
            errorMessage: 'mType 不能为空'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        var params = {
            alias_name:req.body.aliasName,
            real_name:req.body.realName,
            id_card:req.body.idCard,
            m_sex:req.body.mSex,
            m_age:req.body.mAge,
            m_email:req.body.mEmail,
            m_phone:req.body.mPhone,
            m_type:req.body.mType,
            m_tags:req.body.mTags
        };

        wealthManagementerService.saveOrUpdate(params,function (err,result){
            if (err) {
                logger.db.error('one error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
};

/**
 * 修改财富管理人
 * @param req
 * @param res
 */
exports.update = function (req,res) {
    req.checkBody({
        _id: {
            notEmpty: true,
            errorMessage: '_id 不能为空'
        },
        aliasName: {
            notEmpty: true,
            errorMessage: 'aliasName 不能为空'
        },
        realName: {
            notEmpty: true,
            errorMessage: 'realName 不能为空'
        },
        idCard: {
            notEmpty: true,
            errorMessage: 'idCard 不能为空'
        },
        mSex: {
            notEmpty: true,
            errorMessage: 'mSex 不能为空'
        },
        mAge: {
            notEmpty: true,
            errorMessage: 'mAge 不能为空'
        },
        'mEmail': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
            },
            isEmail: {errorMessage: 'email 格式不正确'}
        },
        mPhone: {
            notEmpty: true,
            errorMessage: 'mPhone 不能为空'
        },
        mType: {
            notEmpty: true,
            errorMessage: 'mType 不能为空'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        var params = {
            _id:req.body._id,
            alias_name:req.body.aliasName,
            real_name:req.body.realName,
            id_card:req.body.idCard,
            m_sex:req.body.mSex,
            m_age:req.body.mAge,
            m_email:req.body.mEmail,
            m_phone:req.body.mPhone,
            m_type:req.body.mType
        };

        wealthManagementerService.saveOrUpdate(params,function (err,result){
            if (err) {
                logger.db.error('one error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
};

/**
 * 为客户打标签
 * @param req
 * @param res
 */
exports.addTagCustomers = function (req, res) {
    req.checkBody({
        customers: {
            notEmpty: true,
            errorMessage: 'customers must be not empty'
        },
        tagName: {
            notEmpty: true,
            errorMessage: 'tagName must be not empty'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        //获取session中财富管理人的id（测试期间，写死）
        var wealthManagementerId = '5a42ee5be80b6d2580a94455';
        var params = {
            customers:req.body.customers,
            tagName:req.body.tagName,
            wealthManagementerId:wealthManagementerId
        };

        wealthManagementerService.addTagCustomers(params,function (err,result){
            if (err) {
                logger.db.error('opration error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
}
/**
 * 为客户移除标签
 * @param req
 * @param res
 */
exports.removeTagCustomer = function (req, res) {
    req.checkBody({
        customerId: {
            notEmpty: true,
            errorMessage: 'customerId must be not empty'
        },
        tagName: {
            notEmpty: true,
            errorMessage: 'tagName must be not empty'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        //获取session中财富管理人的id（测试期间，写死）
        var wealthManagementerId = '5a42ee5be80b6d2580a94455';
        var params = {
            customerId:req.body.customerId,
            tagName:req.body.tagName,
            wealthManagementerId:wealthManagementerId
        };

        wealthManagementerService.removeTagCustomer(params,function (err,result){
            if (err) {
                logger.db.error('one error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
}

/**
 * 查询 财富管理人
 * @param req
 * @param res
 */
exports.list = function (req, res) {
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
        if (!value.isEmpty()) {
            logger.system.error('params errors', value.array());
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

        wealthManagementerService.list(index,size,params,{orderIndex:'asc'},function(err,page){
            if(err){
                logger.system.error(err);
                res.status(500).end();
            }else{
                res.status(200).json(page);
            }
        });
    });

};

/**
 * 新增客户关系  (仅测试，该service应服务到新增客户时使用)
 * @param req
 * @param res
 */
exports.addCustomer = function (req, res) {
    req.checkBody({
        customerId: {
            notEmpty: true,
            errorMessage: 'customerId must be not empty'
        },
        customerName: {
            notEmpty: true,
            errorMessage: 'customerName must be not empty'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        //获取session中财富管理人的id（测试期间，写死）
        var wealthManagementerId = '5a42ee5be80b6d2580a94455';
        var params = {
            customerId:req.body.customerId,
            customerName:req.body.customerName,
            wealthManagementerId:wealthManagementerId
        };

        wealthManagementerService.addCustomer(params,function (err,result){
            if (err) {
                logger.db.error('operation error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
}

/**
 * 新增客户关系  (仅测试，该service应服务到新增客户时使用)
 * @param req
 * @param res
 */
exports.removeCustomer = function (req, res) {
    req.checkBody({
        customerId: {
            notEmpty: true,
            errorMessage: 'customerId must be not empty'
        },
        customerName: {
            notEmpty: true,
            errorMessage: 'customerName must be not empty'
        }
    });

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            logger.db.error('params errors ', result.array());
            return res.status(400).end();
        }
        //获取session中财富管理人的id（测试期间，写死）
        var wealthManagementerId = '5a42ee5be80b6d2580a94455';
        var params = {
            customerId:req.body.customerId,
            customerName:req.body.customerName,
            wealthManagementerId:wealthManagementerId
        };

        wealthManagementerService.removeCustomer(params,function (err,result){
            if (err) {
                logger.db.error('operation error', err);
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        })
    });
}
/**
 * 我的客户
 * @param err
 * @param callback
 */
exports.mineCustomers = function (req, res) {
    //获取session中财富管理人的id（测试期间，写死）
    var wealthManagementerId = '5a42ee5be80b6d2580a94455';
    var params = {
        _id:wealthManagementerId
    };
    wealthManagementerService.mineCustomers(params,function (err,result){
        if (err) {
            logger.db.error('operation error', err);
            res.status(500).end();
        } else {
            //var vo = getVo(result);
            res.status(200).json(result);
        }
    });
}


/**
 * 我的标签
 * @param err
 * @param callback
 */
exports.tagsGroup = function (req, res) {

    //获取session中财富管理人的id（测试期间，写死）
    var wealthManagementerId = '5a42ee5be80b6d2580a94455';
    var params = {
        _id:wealthManagementerId
    };
    wealthManagementerService.tagsGroup(params,function (err,result){
        if (err) {
            logger.db.error('operation error', err);
            res.status(500).end();
        } else {
            //var vo = getVo(result);
            res.status(200).json(result);
        }
    });
}