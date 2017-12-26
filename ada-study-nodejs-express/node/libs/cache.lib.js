/**
 * Created by CZD on 2017/12/26 0026.
 */
var LRU = require('lru-cache');
var redis = require('./redis.lib');

var cache = new LRU(10000);

/**
 * 获取缓存
 * @param key
 * @param callback
 */
exports.get = function (key,callback){
    if(redis.enable){
        redis.get(key,callback);
    }else{
        callback(cache.get(key));
    }
}

/**
 * 设置缓存
 * @param key
 * @param value
 * @param callback
 */
exports.set = function(key ,value ,callback){
    exports.setExpire(key,value,-1,callback);
}

/**
 * 设置带时间的缓存
 * @param key
 * @param value
 * @param expire
 * @param callback
 */
exports.setExpire = function (key,value,expire,callback) {
    if(redis.enable){
        redis.set(key,value,expire,function (result) {
            if(result){
                callback(true);
            }else{
                callback(false);
            }
        })
    }else{
        cache.set(key,value);
        callback(true);
    }
}

/**
 * 删除缓存
 * @param key
 * @param callback
 */
exports.del = function(key,callback){
    if(redis.enable){
        redis.del(key,function(result){
            if(result){
                callback(true);
            }else{
                callback(false);
            }
        })
    }else{
        cache.del(key);
        callback(true);
    }
}