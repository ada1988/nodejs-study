var elasticsearch=require('elasticsearch');
var config=require('../config/elasticsearch.config');
var logger=require('../lib/logger.lib');
var async=require('async');
exports.init=function () {
    if(config.enable){
        logger.system.info('elasticsearch start connection\t',config.params);
        var client=new elasticsearch.Client(config.params());
        for(let i=0;i<config.indexes.length;i++){
            var index=config.indexes[i];
            client.indices.exists({
                index:index.name
            },function (err,resp) {
                if(err){
                    logger.system.error(err);
                }else{
                    if(resp){
                        logger.system.info(index.name ,' exists');
                    }else {
                        logger.system.info('create index ',index.name);
                        client.indices.create({
                            index:index.name,
                            body:{
                                settings:index.settings
                            }
                        },function (err,resp) {
                            if(err) {
                                logger.system.error(err);
                            }else{
                                logger.system.info('create index ',index.name,' success');
                            }
                        });
                    }
                }
            });
        }
    }
}
