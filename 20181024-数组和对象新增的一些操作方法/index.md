## 数组新增操作方法（二）
- Array.isArray() 判断是否是一个数组
  语法： boolean Array.isArray(data) 检测一项数据是否是数组
  参数： data 要检测的数据  
  返回值： data如果是数组返回 true，否则 false
- arr.includes(data[,formIndex]) 判断数组是否包含某个值
  语法： boolean arr.includes(data[,formIndex])
  参数:
        data 要查找的数据
        formIndex 从第几位开始找
  返回值： true 数组中包含 data
          false 数组中不包含 data
- arr.find(callback(element[, index[, array]])[, thisArg]) 查找第一个符合规则的值
- arr.findIndex(callback(element[, index[, array]])[, thisArg]) 查找第一个符合规则的值的下标

## 对象新增的属性

- Object.is(data1,data2) 比较两个值是否相等
    - 注意在 Object.is 比较中 NaN === NaN
- Object.assign(obj1,obj2) 合并对象,把obj2 合并到 obj1 中

- Object.defineProperty(obj, prop, descriptor)
    - obj 要在其上定义属性的对象。
    - prop 要定义或修改的属性的名称。
    - descriptor 将被定义或修改的属性描述符。
        - configurable 该属性是否可以删除
        - enumerable 该属性是否可以被枚举
        - value
        - writable 是否可以修改
- Object.freeze(obj) 冻结对象
- Object.isFrozen(obj) 判断对象是否被冻结
       