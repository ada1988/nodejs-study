/**
 * Created by yingwei on 17-7-21.
 */
var log4js=require('log4js');

var config=require('../config/log4js.config');

log4js.configure(config);
/**
 * 正常访问
 * @type {Logger}
 */
exports.access=log4js.getLogger('access');
/**
 * 系统日志
 * @type {Logger}
 */
exports.system=log4js.getLogger('system');
/**
 * 数据库日志
 * @type {Logger}
 */
exports.database=log4js.getLogger('database');

/**
 * 项目日志记录
 * @type {Logger}
 */
exports.project=log4js.getLogger("project");
/**
 * 配置express
 * @returns {*}
 */
exports.expressLogger=log4js.connectLogger(exports.access);