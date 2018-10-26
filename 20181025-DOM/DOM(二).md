# DOM

## data 自定义属性
- 在标签中定义data自定义属性：data-key="value";
- 在js操作该元素的 data 自定义属性：el.dataset
    - 获取：el.dataset.key
    - 设置: el.dataset.key = "value"

## 节点操作

### 创建节点
语法：element document.createElement("tagName"); 创建一个节点
参数：tagName 标签名称
返回值：创建好的节点

### 向页面中添加元素
- el.appendChild(node)  在元素的末尾添加一个子级
- el.insertBefore(newNode,oldNode) 在 oldNode 前边添加入 newNode 
- 在使用 appendChild 和 insertBefore时，如果添加是一个页面上已经存在的节点，会先从原位置删除，然后在添加到新的位置去。

### 删除节点
- parent.removeChild(el) 删除掉某个子元素

### 克隆节点
- node.cloneNode(deep) 
    - deep: 默认为false
    - deep 为 true, 克隆元素及属性，以及元素的内容和后代
    - deep 为 false, 只克隆元素本身，及它的属性

## offsetParent 定位父级
offsetParent 定位父级，元素的位置根据哪个父级进行计算，定位父级就是谁

## 元素的尺寸获取
- offset
    - offsetWidth  可视宽度
    - offsetHeight 可视高度 
    - offsetLeft   距离定位父级的left坐标 
    - offsetTop    距离定位父级的top坐标

- client
    - clientWidth  可视宽度 - border
    - clientHeight 可视高度 - border
    - clientTop    上边框宽度
    - clientLeft   左边框宽度 

- scroll
    - scrollWidth   内容宽度
    - scrollHeight  内容高度
    - scrollLeft    左右滚动距离
    - scrollTop     上下滚动距离

- getBoundingClientRect()
    - left   元素左侧距离可视区左侧距离
    - top    元素顶部距离可视区顶部距离
    - right  元素右侧距离可视区左侧距离
    - bottom 元素底部距离可视区顶部距离
    - width  可视宽度 
    - height 可视高度