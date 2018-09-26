# 初步认识 JavaScript 
JavaScript 是一种动态类型、弱类型、基于原型的语言，内置支持类型，它的解释器被称为JavaScript引擎，广泛用于客户端的脚本语言。在网页上使用，用来给HTML网页增加动态功能。

## JavaScript 在 Web 世界中的常规用途
- 行为交互: 根据用户的操作行为去做出一些相应的反馈
- 数据交互: 在前后端之间进行数据的传输
- 逻辑交互: 根据目前不同的状态，去做出一些不同的事情

## JavaScript 的组成部分
- ECMAScript (JS的核心：数据类型，流程语句，计算……)
- DOM (Doument Object Model) 文档对象模型 (对页面文档的相关操作) 
- BOM (Browers Object Model) 浏览器对象模型 (对浏览器相关的操作)

## JavaScript 书写的位置
- 行间
    <input type="button" onclick="alert(1);" value="Click" />
    优点：直接，简单明了
 	缺点：可读性差，不易维护，不易扩展

- 内部
    <script>
		alert(1)
	</script>
	优点： js和html分离，可以复用代码
    缺点：代码不能多文件使用

- 外部
    <script src="demo.js"></script>
	优点：多文件共用


## 注释
- 单行注释 // 注释掉的内容
- 多行注释 /* 注释掉的内容 */

## 在制作特效时的流程
1. 完善布局
2. 手动修改布局或样式 - 思考效果思路
    1) 在什么情况下
    2) 操作哪些元素
    3) 修改哪些样式或内容
3. 用中文描述自己的思路
4. 开始实现交互 

## 来个小例子 - 改变div的样式
- alert('弹窗内容') 弹出框,接收的内容是字符串
- += 赋值元素：a += b  -->  a = a + b;

## 获取元素
- document.getElementById("idName"); 
    - 通过 id 来获取一个元素;
    - "idName" id名字,数据类型: String 字符串
- document 找到整个文档
- document.body 找到 body 元素
- document.head 找到 head 元素

## 事件绑定
事件:与文档元素或浏览器发生的一些特定的交互瞬间，会产生事件
事件由系统事先设定的、能被对象识别和响应的动作，如果click,mouseover...
可以绑定一个事件处理函数，当事件发生时，执行相对应的代码

- js 中，通过事件来响应用户的行为
- onclick 当点击的时候
- onmouseover 当鼠标移入的时候
- onmouseout 当鼠标移出的时候
- 绑定事件 (给元素添加一个事件)
    - el.on事件名称 = function(){/*触发事件之后，要做的事情*/};
    - 事件绑定，只能绑定一个函数，再次绑定时，就会覆盖之前的
- window.onload 事件,页面中所有的内容加载完成    

## 变量
变量主要用来存储数据，方便我们使用
变量是标识符的一种，是一种变化的量，用来储任意类型的数据

### 声明变量的方式
	使用关键字 ：var 
	    var 变量名; // 声明变量为赋值，默认值为undefined 
	    变量名 = 数据;  // 给变量赋值
	    var 变量名 = 数据; // 声明并赋值（初始化）
	    var 可以声明多个变量，以逗号隔开

### 知识点
	=  赋值运算符；把右边的数据赋给左边的变量或属性

### 注意事项
	使用变量前要先声明，否则程序会报错

## 初识函数
当我们有多条代码需要重复执行的时候，这个时候，就可以使用函数
函数可以封装任意多条代码，形成一个代码块，放在函数内的代码不会主动执行

### 函数定义
- 函数声明
	function 函数名(){ //执行语句 } 
- 函数表达式
	var func = function(){}  

### 函数调用
定义函数后并不会执行函数的代码，必须调用函数后才能执行

- 直接执行: 函数名();
- 事件触发调用：函数赋值给事件

### 匿名函数
    - 匿名函数:没有名字的函数  
	- 定义匿名函数后要立马使用，否则会报错
    (function(){
        执行语句
    })();

## 属性操作
- 属性操作的第一种方式: .
    - 属性的读操作(获取这个属性): obj.属性名
    - 属性的写操作: obj.属性名 = 属性值;
- 属性操作的第二种方式: []
    - 属性的读操作(获取这个属性): obj["属性名"]
    - 属性的写操作: obj['属性名'] = 属性值;
    - 第一种属性操作的方式，属性名只是一个字面量,所以没有办法调去变量，而第二种属性操作的方式，接收的是一个 字符串，就可以使用变量
- 元素常用属性:
    - id id属性
    - className class属性
    - style 行间样式 
        - width
        - height
        - background
        …… 
        - cssText 完整的行间样式
            - 操作 cssText 的时候，注意，如果直接赋值，会替换掉所有的行间样式，如果不想替换所有的，可以使用 += 赋值;
            box.style.cssText += "width:200px";
    - tagName 标签名字 (大写)    
    - innerHTML 标签内容
    - value 获取表单控件内容的时候，获取的都是value值  

- 属性操作注意事项
    - 在 js 中，遇到 - ，省略 -，然后后边的单词 首字母大写  
    - 获取文件路径的时候，暂时只能获取到绝对路径
    - 只能获取到 js 中定义的自定义属性，写在结构中的自定义属性，暂时获取不到 

## 标示符
什么是标识符: 变量名、常量名、函数名、函数参数名、对象属性名的统称

### 标示符的命名规则
- 由数字、字母、下划线和美元符($)组成
- 首字符不能使数字 
- 不能使用JS的关键字和保留字

### 关键字和保留字
- 关键字：js 本身已经使用了的单词
    break/case/catch/continue
default
delete
do
else
finally
for
function
if
in
instanceof
new
return
switch
this
throw
try
typeof
var
void
while
with
- 保留字：js 觉得自己将来可能会使用的单词
abstract
boolean
byte
char
class
const
debugger
double
enum
export
extends
final
float
goto
implements
import
int
interface
long
native
package
private
protected
public
short
static
super
synchronized
throws
transient
volatile

### 驼峰命名
- 小驼峰命名: 从第二个单词开始，首字母大写
- 大驼峰命名: 从第一个单词开始，首字母大写

## 字符串
在 js 中有很多不同的数据类型,比如 数字 和 字符串
在 js 中 包含在一对引号(一对单引号，或 一对上引号，或 一对反引号)之间的 0 到 多个 字符，就是一个字符串

### 字符串连接
- 加号运算符 +
	如果两边都为数字，做加法运算
- 加号连接符 +
	如果有一边为字符串，则做字符串拼接



## console

浏览器自带的调试工具，可以方便的调试HTML、js、网络、性能……
	F12可以快速打开

console
	全局对象，向控台输出内容
	console.log(值)

## undefined和null
- undefined 未定义: 通常发生在 变量声明了但是没有赋值或者对象的属性不存在的时候
- null 空对象: 通常出现在元素未找到时
    - null 不能进行属性操作