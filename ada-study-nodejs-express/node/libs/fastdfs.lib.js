/**
 * Created by CZD on 2017/12/26 0026.
 */
var fdfs = require('fdfs');
var fdfsConfig = require('../config/fdfs.config');

var mime = require('./mime.lib');
var log = require('./logger.lib');

if(fdfsConfig.enable){
    log.system.info('fastdfs enable config:'+JSON.stringify(fdfsConfig.config));
    var client = new fdfs(fdfsConfig.config);
    /**
     * 上传文件
     * @param group
     * @param path
     * @param originalFilename
     */
    exports.upload = function (group ,path ,originalFilename){
        if(!fdfsConfig.enable){
            log.system.debug('fastdfs not enabled');
            return callback(null);
        }
        var m = mime.getMime(originalFilename);
        if(!m){
            return callback(originalFilename+' mime not found');
        }
        client.upload(path,{
            method:'upload',
            group:group,
            ext:m.ext
        }).then(function(fileId){
            //fildId为group+'/'+filename
            callback(null,fileId);
        }).catch(function (err) {
            callback(err);
        });
    }

    /**
     * 删除
     * @param fid
     * @param callback
     * @returns {*}
     */
    exports.del = function (fid, callback) {
        if (!fdfsConfig.enable) {
            log.system.wran('fastdfs not enabled');
            return callback(null);
        }
        client.del(fid).then(function () {
            callback(null);
        }).catch(function (err) {
            callback(err);
        });
    }
}else{
    log.system.warn('fastdfs disable');
}

/**
 * 是否启用
 * @type {boolean}
 */
exports.enable = fdfsConfig.enable;