let domain = "https://data.miaov.com/";
// 添加 tap 事件
function dispatchTap(el){
    let tap = new Event("tap");
    let startPoint = {};
    $(el).on("touchstart",function(e){
        let touch = e.changedTouches[0];
        startPoint.x = touch.pageX;
        startPoint.y = touch.pageY;
    });
    $(el).on("touchend",function(e){
        let touch = e.changedTouches[0];
        let nowPoint = {};
        nowPoint.x = touch.pageX;
        nowPoint.y = touch.pageY;
        if(Math.abs(nowPoint.x - startPoint.x)<10
        && Math.abs(nowPoint.y - startPoint.y)<10){
            this.dispatchEvent(tap);
        }
    });
}


function getIndexData(page,rows,succ){
    $.ajax({
        url: domain+'/lecturer/lists?page='+page+'&rows='+ rows,
        type: "POST",
        dataType: "json",
        data: {
            order: "desc",
	        sort:"id",
	        category_id:1,
	        recommend:1
        },
        success:succ,
        error:function(err){
            alert(err);
        }     
    });
}
function getVerifySrc(){
    return domain + "user/verify?"+Date.now();
}
/*
    url: 接口地址
    type: 请求方式
    data: 提交数据
    dataType: 返回的数据类型
    xhrFields: {
        withCredentials: true
    } 是否携带cookie
    crossDomain: true, 跨域传输cookie
    success 成功的数据


*/
function login(data,succ){
    $.ajax({
        url: domain+"/user/login",
        type: "POST",
        data: data,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}

function isLogin(succ){
    $.ajax({
        url: domain+"/user/islogin",
        type: "POST",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}

function loginOut(succ){
    $.ajax({
        url: domain+"/user/logout",
        type: "POST",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}

function pageIsLogin(){
    isLogin(function(data){
        if(data.code == 0) {
            let outBtn = $('<span class="header-btn-right header-user">'+data.username+'</span>')
            $("#header").append(outBtn);
            dispatchTap(outBtn.get());
            outBtn.on("tap",function(){
                loginOut(function(data){
                    if(data.code == 0){
                        outBtn.remove();
                        $("#header").append('<a class="header-btn-right iconfont icon-denglu" href="http://127.0.0.1/移动端2/login/"></a>');
                    }
                });
            });
        } else {
            $("#header").append('<a class="header-btn-right iconfont icon-denglu" href="http://127.0.0.1/移动端2/login/"></a>');
        }
    });
}

// 获取详情

function getWorkDetails(id,succ){
    $.ajax({
        url: domain+"/lecturer/info",
        type: "POST",
        data: {
            article_id: id
        },
        dataType: "json",
        success:succ
    });
}

function isGood(id,succ){
    $.ajax({
        url: domain+"/lecturer/getgood",
        type: "POST",
        dataType: "json",
        data: {
            article_id: id
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}

function cancelGood(id,goodid,succ){
    $.ajax({
        url: domain+"/lecturer/cancelgood",
        type: "POST",
        dataType: "json",
        data: {
            article_id: id,
            goodid:goodid
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}
function good(id,succ){
    $.ajax({
        url: domain+"/lecturer/good",
        type: "POST",
        dataType: "json",
        data: {
            article_id: id
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:succ
    });
}