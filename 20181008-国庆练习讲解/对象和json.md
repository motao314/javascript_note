# 对象和JSON

## 对象 (object)
- 语法: 
    `
        对象: {
            "key":value,
            "key":value
        }
    
    `
- 对象中的数据，是存在对象的属性中的

- 获取对象的数据，obj["key"],obj.key

- 设置或添加数据：obj["key"] = value

- Object.keys() 获取对象的所有key(键名)

    - 语法: Array Object.keys(obj)
    - 参数: obj 要获取键名的对象
    - 返回值: 所有键名组成的数组

- Object.values() 获取对象的所有value(键值)

    - 语法: Array Object.values(obj)
    - 参数: obj 要获取键值的对象
    - 返回值: 所有键值组成的数组

- in 运算符: `key` in object 判断这个对象是否存在对应的属性

- for-in 循环,找到对象下的所有属性

    `
        for(let s in obj){
            console.log(s);//对应obj的每一个key
            console.log(obj[s]);//对应obj的每一个value
        }
    `

## json

- json 拥有对象格式的一个字符串 `'{"name": "妙味","age": 12}'`
- JSON.parse(json) 把 json 转换成一个对象
- JSON.stringify(obj) 把 obj 转换成一个 json

