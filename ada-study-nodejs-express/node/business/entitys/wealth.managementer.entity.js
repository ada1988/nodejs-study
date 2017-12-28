/**
 * 保险经纪人、独立理财师
 *
 * 统称：财富管理人
 *
 */
var mongoose = require('mongoose');

var wealthManagementerSchema = new mongoose.Schema({
    /**
     * 简称
     */
    alias_name: {
        type: String,
        required: true
    },
    real_name: {
        type: String,
        required: true
    },
    id_card: {
        type: String,
        required: true
    },
    m_sex: {
        type: String,
        required: true
    },
    m_age: {
        type: Number,
        required: true
    },
    m_email: {
        type: String,
        required: true
    },
    m_phone: {
        type: String,
        required: true
    },
    m_type: {
        type: String,
        default:'保险经纪人',
        required: true,
        enum: ['保险经纪人','独立理财师']
    },
    /**
     * 我的客户
     */
    mine_customers:{
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    /**
     *  自定义标签
     */
    m_tags: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    /**
     * 标签下的客户
     */
    m_tag_customers:
    {
            type: mongoose.Schema.Types.Mixed,
            required: false
    }

});


var collectionName = 'wealth_managementer';
module.exports = mongoose.model('WealthManagementer', wealthManagementerSchema,collectionName);