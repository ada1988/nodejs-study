/**
 * Created by CZD on 2017/12/26 0026.
 *
 * 模块学习地址：https://github.com/luin/ioredis
 *
 *  user strict 自行百度
 */
'user strict'

var Redis = require("ioredis");
var redisConfig = require("../config/redis.conf");
var logger = require("./logger.lib");
//客户端
var client;

const LOCK_LUA_SCRIPT = "local lockSet = redis.call('setnx', KEYS[1], ARGV[1])\n"+
    "if lockSet == 1 then\n" +
    "redis.call('pexpire', KEYS[1], ARGV[2])\n" +
    "end\n" +
    "return lockSet";

/**
 * 是否可用
 * @type {redisConfig.enable|*|((setting: string) => Application)|(() => *)|boolean|((cap: number) => void)}
 */
exports.enable = redisConfig.enable;

if(redisConfig.enable){
    var redisUrl = redisConfig.params.host+':'+redisConfig.params.port;
    logger.database.debug('start init redis client '+redisUrl);
    client = new Redis(redisConfig.params);
    client.on('error',function(err){
        logger.database.error('redis client init failed '+err);
    });
    client.on('connect',function (){
        logger.database.info('redis client init success '+redisUrl);
        /**
         * 定义lock
         */
        client.defineCommand('lock',{
            numberOfKeys:1,
            lua:LOCK_LUA_SCRIPT
        });
        logger.database.info('connection redis.lock success');
    });
}else{
    logger.database.info('redis client disable');
}

/**
 * 获取值
 * @param key
 * @param callback
 */
exports.get = function (key ,callback){
    client.get(key,function(err,result){
        if(err){
            callback(null)
        }else{
            try{
                callback(JSON.parse(result));
            }catch(err) {
                callback(null);
            }
        }
    });
}

/**
 * 设置值
 * @param key
 * @param value
 * @param expire
 * @param callback
 */
exports.set = function (key,value,expire,callback){
    client.set(key,JSON.stringify(value),'EX',expire,function (err,result) {
        if(err){
            callback(null);
        }else{
            callback(result);
        }
    })
};

/**
 * 删除值
 * @param key
 * @param callback
 */
exports.del = function(key,callback){
    client.del(key,function(err,result){
       if(err){
           callback(null);
       } else{
           callback(result);
       }
    });
}

/**
 * 获取锁，并等待一段时间
 * @param key
 * @param expire
 * @param callback
 */
exports.lock = function(key,expire,callback){
    var start = new Date().getTime();
    function tryLock(){
        exports.tryLock(key,expire,function(result){
           if(result){
               callback(result);
           } else{
               var endTime = new Date().getTime();
               if(endTime-start <expire * 1000){
                   logger.database.debug('retry get lock '+ endTime);
                   setTimeout(tryLock,100);
               }else{
                   callback(0);
               }
           }
        });
    }
}

/**
 * 尝试获取锁，不会进行等待
 * @param key
 * @param expire
 * @param callback
 */
exports.tryLock = function(key,expire,callback){
    client.lock(key,1,expire,function(err,result){
        if(err){
            callback(0);
        }else{
            callback(result);
        }
    });
}

exports.unlock = function(key,callback){
    var isCallback = arguments.length == 2;
    client.del(key,function(err,result){
        if(isCallback){
            if(err){
                callback(0);
            }else{
                callback(result);
            }
        }
    });
}