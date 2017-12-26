module.exports = {
    enable: true,
    indexes: [
        {
            name: 'guocuhui',
            settings: {
                "number_of_shards": 1,
                "number_of_replicas": 0
            }
        }
    ],
    params: function () {
        return {
            requestTimeout: 3000,
            hosts: [
                {
                    protocol: 'http',
                    host: '192.168.4.91',
                    port: 9200,
                    weight: 1
                }
                /*
                ,
                {
                    protocol: 'http',
                    host: '192.168.6.181',
                    port: 9200,
                    weight: 1
                },
                {
                    protocol: 'http',
                    host: '192.168.6.180',
                    port: 9200,
                    weight: 1
                }*/
            ],
            selector: 'roundRobin'
        }
    }
}