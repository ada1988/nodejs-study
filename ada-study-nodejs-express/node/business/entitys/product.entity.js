/**
 * Created by CZD on 2017/12/25 0025.
 */

var mongoose = require("mongoose");

var productCommentsSchema = new mongoose.Schema({
        title: { type: String },
        no: { type: String }
});
var collectionName = 'products';

module.exports = mongoose.model('Product',productCommentsSchema,collectionName);