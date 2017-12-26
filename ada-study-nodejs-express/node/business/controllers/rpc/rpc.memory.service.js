/**
 * Created by CZD on 2017/12/26 0026.
 */
var request = require('request');
var BASE_URL="http://192.168.6.184:8080";

/**通过ID获取用户信息
 * @param id
 * @param callback
 */
exports.findById=function (id,callback) {
    request(BASE_URL+'/rpc/account/simpleMember.php?id='+id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try{
                callback(null,JSON.parse(body));
            }catch (e){
                callback(e);
            }
        }else {
            callback(error,response.statusCode);
        }
    });
}