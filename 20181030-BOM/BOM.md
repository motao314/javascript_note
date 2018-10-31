# BOM

## window
- 弹窗
    - alert
    - confirm()
    - prompt
- open 打开一个新窗口
- close 关闭当前窗口
- innerWidth/innerHeight 可视区宽高
- document.body.clientHeight 页面高度
- document.documentElement.scrollTop/document.documentElement.scrollLeft
- window.scrollY/window.scrollX
- 事件
    - window.onscroll
    - window.onresize

### screen 屏幕
- availHeight 屏幕能使用高度
- availWidth 屏幕能使用宽度
- height  屏幕高度
- width 屏幕宽度

### location 地址栏信息
- hash	设置或返回从井号 (#) 开始的 URL（锚）。
    - hashchange hash值改变的时候
- host	设置或返回主机名和当前 URL 的端口号。 //  www.baidu.com:8080
- hostname	设置或返回当前 URL 的主机名。
- href	设置或返回完整的 URL。
- pathname	设置或返回当前 URL 的路径部分。
- port	设置或返回当前 URL 的端口号。 // :8080
- protocol	设置或返回当前 URL 的协议。
- search	设置或返回从问号 (?) 开始的 URL（查询部分）。
- reload()  刷新

### navigator 浏览器信息
- userAgent 用户代理(浏览器的详细信息)

### history 历史记录
- length	返回浏览器历史列表中的 URL 数量
- back()	加载 history 列表中的前一个 URL。
- forward()	加载 history 列表中的下一个 URL。
- go()	加载 history 列表中的某个具体页面。