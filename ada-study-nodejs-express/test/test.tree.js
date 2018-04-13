/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
function treeDataTranslate1 (data, id, pid) {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

var data=[{id:1,name:"root",parentId:null},{id:0,name:"root2",parentId:null},{id:2,name:"root-child",parentId:1},
  {id:3,name:"root-child2",parentId:1},{id:4,name:"root-child-child",parentId:2},{id:5,name:"root-child-child2",parentId:3}];
var res = treeDataTranslate1(data,"id","parentId");
console.info(JSON.stringify(res));
