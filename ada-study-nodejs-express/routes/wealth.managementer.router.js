/**
 * Created by CZD on 2017/12/26 0026.
 */
var wealthManagementerController = require("../node/business/controllers/admin/wealth.managementer.controller");

/**
 * 注册 基金管理人 路由器
 * @param router
 */
exports.registRout = function(router){
    /**
     * 获取基金管理人：分页数据
     *
     * 请求案例：
     *      index:页码
     *      size：每页条数
     */
    router.get('/wealthManagementer/list.do',function(req,res,next){
        wealthManagementerController.list(req,res);
    });

    /**
     * 财富管理人：新增基本数据
     * 请求案例：
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"aliasName":"小崔2","realName":"崔志达","idCard":"130182198802244855","mSex":"男","mAge":"12","mEmail":"1046562032@qq.com","mPhone":"15131621026","mType":"保险经纪人"}
     */
    router.post('/wealthManagementer/create.do',function(req,res,next){
        wealthManagementerController.create(req,res);
    });

    /**
     * 财富管理人：修改基本数据
     *
     * 请求案例：
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"_id":"5a42ee5be80b6d2580a94455","aliasName":"小崔2","realName":"崔志达","idCard":"130182198802244855","mSex":"男","mAge":"12","mEmail":"1046562032@qq.com","mPhone":"15131621026","mType":"保险经纪人"}
     */
    router.post('/wealthManagementer/update.do',function(req,res,next){
        wealthManagementerController.update(req,res);
    });

    /**
     * 财富管理人：批量为客户打标签
     *
     * 请求案例：
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"customers":[{"custormerId":"5a42f5a4fccf5808d811bff2","custormerName":"xiacui夏翠人1"},{"custormerId":"5a42f5a4fccf5808d811bff4","custormerName":"xiacui"}],"tagName":"中国"}
     */
    router.post('/wealthManagementer/addTagCustomers.do',function(req,res,next){
        wealthManagementerController.addTagCustomers(req,res);
    });

    /**
     * 财富管理人：为某一客户移除标签
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"customerId":"5a42f5a4fccf5808d811bff2","tagName":"中国人"}
     */
    router.post('/wealthManagementer/removeTagCustomer.do',function(req,res,next){
        wealthManagementerController.removeTagCustomer(req,res);
    });

    /**
     * 测试添加客户关系
     *
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"customerId":"5a42f5a4fccf5808d811bff2","customerName":"sxz"}
     */
    router.post('/wealthManagementer/addCustomer.do',function(req,res,next){
            wealthManagementerController.addCustomer(req,res);
    });

    /**
     * 测试移除客户关系
     *      Method:POST
     *      Content-Type:application/json
     *      request body:{"customerId":"5a42f5a4fccf5808d811bff2","customerName":"sxz"}
     */
    router.post('/wealthManagementer/removeCustomer.do',function(req,res,next){
        wealthManagementerController.removeCustomer(req,res);
    });

    /**
     * 基金管理人：我的客户
     */
    router.get('/wealthManagementer/mineCustomers.do',function(req,res,next){
        wealthManagementerController.mineCustomers(req,res);
    });

    /**
     * 基金管理人：标签汇总
     */
    router.get('/wealthManagementer/tagsGroup.do',function(req,res,next){
        wealthManagementerController.tagsGroup(req,res);
    });
}

