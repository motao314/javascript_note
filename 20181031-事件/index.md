# 事件 event

## 事件绑定与监听
- 事件绑定：通过 on 添加事件， 只能添加一个事件处理函数，重复添加，会覆盖
- 事件监听：
    - 事件监听可以给元素添加多个事件处理函数
    - 事件监听器：el.addEventListener("事件名称",fn 事件处理函数[,option]);
    - 取消事件监听: el.removeEventListener("事件名称",fn 事件处理函数[,option]);
        - 如果该事件处理，需要被移出，一定不能用匿名函数
    - option:
        - true (捕获)|false(冒泡) 默认是冒泡
        - 配置对象
            - capture: true|false 是否在捕获阶段执行
            - passive: true|false 阻止取消默认事件
            - once: false 是否只执行一次
    - 事件流
        - 事件捕获: 当我们在页面中触发一个事件时，会从顶层对象一层一层向下，去查找事件发生在哪个元素上，查找的过程中，如果元素有对应事件，就会执行
        - 事件冒泡: 当元素触发一个事件时，会一层一层向上传递这个事件，传递过程中的每一层，如果有这个事件就都会触发  
        - 捕获 --> 事件源(目标元素) -->冒泡

### event 事件对象
在标准浏览器下，事件对象是事件函数的第0个参数。
event 事件对象：事件的详细信息：事件名称, 键盘按键, 鼠标按键, 鼠标坐标……

- event.cancelBubble 是否阻止冒泡 
- event.preventDefault() 取消默认事件
- event.clientX/event.clientY 相对于可视区的坐标
- event.pageX/event.pageY 相对于页面的坐标
- event.target 事件源(事件具体触发在哪个元素上)
- event.type 事件名称
- event.stopPropagation() 阻止冒泡
- event.altKey 返回当事件被触发时，"ALT" 是否被按下。
- event.ctrlKey 返回当事件被触发时，"CTRL" 键是否被按下。
- event.shiftKey 返回当事件被触发时，"SHIFT" 键是否被按下。
- event.keyCode 键值
- event.keyName 键名
- event.button  鼠标按下的是哪个键

### 阻止冒泡
- event.cancelBubble 阻止冒泡
- event.stopPropagation() 取消冒泡

### 阻止默认事件
默认事件(默认行为):

- retrun false 阻止默认事件, 一般用在事件绑定中
- event.preventDefault() 
 
### 事件

- mouseenter 移入这个范围
- mouseleave 移出这个范围
- mousemove 鼠标在元素中移动

### 事件代理
事件代理(事件委托):利用冒泡原理和event下的target，把子元素的事件委托在父祖级上进行处理

- 优点:
    - 减少事件注册
    - 可以给将来的元素添加事件

- 缺点:
    - 事件处理函数中需要判断事件源增加逻辑复杂度
    - 父祖级和事件源之间不能有阻止冒泡 
