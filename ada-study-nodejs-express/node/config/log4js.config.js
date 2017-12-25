/**
 * 日志配置
 * Created by yingwei on 17-7-21.
 */
module.exports =
    {
        //定义打印器
        appenders: {
            console: {type: 'console'},
            system: {
                type: 'dateFile',
                filename: 'logs/system/system',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            database: {
                type: 'dateFile',
                filename: 'logs/database/database',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            access: {
                type: 'dateFile',
                filename: 'logs/access/access',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            project: {
                type: 'dateFile',
                filename: 'logs/study/simple',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: {appenders: ['console'], level: 'debug'},
            system: {appenders: ['console', 'system'], level: 'debug'},
            database: {appenders: ['console', 'database'], level: 'debug'},
            access: {appenders: ['console', 'access'], level: 'debug'},
            project: {appenders: ['console', 'project'], level: 'debug'}
        }
    }

