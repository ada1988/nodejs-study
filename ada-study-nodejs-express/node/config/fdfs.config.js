/**
 * Created by yingwei on 17-7-26.
 */
module.exports = {
    config: {
        // tracker servers
        trackers: [
            {
                host: '192.168.4.88',
                port: 22122
            }
        ],
        // 默认超时时间10s
        timeout: 10000,
        // 默认后缀
        // 当获取不到文件后缀时使用
        defaultExt: 'txt',
        // charset默认utf8
        charset: 'utf8'
    },
    enable: true,
    domain: '192.168.4.88',
    protocol: 'http',
    url: function (uri) {
        var url = protocol + "://" + domain;
        if (!uri.startWith("/")) {
            url += "/";
        }
        return url += uri;
    }
}