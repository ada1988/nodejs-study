/**
 * 分页信息
 * Created by yingwei on 17-7-27.
 */
module.exports = function (index, size, dataCount) {
    var _this = this;

    //存储数据
    _this.data = {};
    _this.setDataCount=function (dataCount) {
            _this.init(_this.index,_this.size,dataCount);
    }

    _this.init=function (index,size,dataCount) {
        //数据总数
        _this.dataCount = parseInt(dataCount);
        //数据大小
        _this.size = parseInt(size);
        if(_this.size>100){
            _this.size=100;
        }
        //当前页码
        _this.index = parseInt(index < 1 ? 1 : index);
        //页码总数
        _this.total = parseInt(dataCount % size == 0 ? dataCount / size : dataCount / size + 1);
        //需要跳过数量
        _this.skip = parseInt((index - 1) * size);
    }

    _this.init(index,size,dataCount);
}
