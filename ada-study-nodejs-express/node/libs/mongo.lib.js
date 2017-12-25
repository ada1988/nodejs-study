/**
 * Created by CZD on 2017/12/25 0025.
 * mongoose 封装
 */
var mongoose = require("mongoose");
var mongoConfig = require("../config/mongo.config");
var logger = require("../libs/logger.lib");
mongoose.Promise = require('bluebird');

exports.connection = function (callback) {
    var uri ='mongodb://'+mongoConfig.user+':'+mongoConfig.pass+'@'+mongoConfig.host+':'+mongoConfig.port+'/'+mongoConfig.db;
    logger.database.info("start init mongo "+uri);
    mongoose.connect(uri,{ useMongoClient: true },function(err){
        // if error is truthy, the initial connection failed.
        if(err){
            err.type = 'mongodb';
            logger.database.error("mongo init failed "+err);
            callback(err);
        }else{
            logger.database.info("mongo init sucess "+uri);
            callback();
        }
    });
};