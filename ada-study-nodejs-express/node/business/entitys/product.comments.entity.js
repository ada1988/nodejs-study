/**
 * Created by CZD on 2017/12/25 0025.
 */

var mongoose = require("mongoose");

/**
 * 验证
 */
function userValidator (val) {
      return val == 'something';
}

var custom = [{ validator: userValidator, msg: 'Uh oh, {user} does not equal "something".' }];

var productCommentsSchema = new mongoose.Schema({
        user: { type: String },
        comments: { type: String },
        product:{type: mongoose.Schema.Types.ObjectId,ref: 'Product'},
        type: { type: String },
        state: { type: Number },
        update_date: { type: Date,default:Date.now()},
        create_date: { type: Date },
        up: { type: Number },
        m_tag_customers:
        {
            type: mongoose.Schema.Types.Mixed,//未知类型定义（该实例我使用数组）
            required: false
        }
});
var collectionName = 'productcomments';

module.exports = mongoose.model('ProductComments',productCommentsSchema,collectionName);