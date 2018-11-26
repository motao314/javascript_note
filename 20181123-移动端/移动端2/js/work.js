$(function(){
    pageIsLogin();//判断是否登陆
    
    /* 导航切换 */
    dispatchTap($(".header-btn-left").get(0));
    $(".header-btn-left").on("tap",function(){
        $(".page").toggleClass("pageHide");
    });


    $(".page").css("height",innerHeight);
    
    // 获取详情页数据
    let id = location.hash.substr(1);
    let goodNub = 0;
    getWorkDetails(id,function(data){
        if(data.id === undefined){
            location.href = "http://127.0.0.1/移动端2/";
            return ;
        }
        // 数据生成
        $(".work-title").text(data.title);
        $(".wrok-details").html(data.content);
        goodNub = data.good;
        $(".work-aside .good").text('有'+goodNub+'人觉得很赞');
        // 添加滑动

        let pageScroll = new BScroll($(".page .wrap").get(0),{
            tap: true
        });
        $(".wrok-details").find("img").on("load",function(){
            pageScroll.refresh();
        });
        let isGetGoodState = false;
        $("#goodBtn").on("tap",function(){
            if(isGetGoodState){
                return ;
            }
            isGetGoodState = true;
            isGood(id,function(data){
                if(data.code == "0"){
                    // 取消点赞
                    cancelGood(id,data.gooid,function(data){
                        if(data.code == "0"){
                            $("#goodBtn").css("color","");
                            goodNub--;
                            isGetGoodState = false;
                            $(".work-aside .good").text('有'+goodNub+'人觉得很赞');
                        }
                    });
                } else if(data.code == "1"){
                    // 没有登陆提示登陆
                    alert("请登录之后，点赞");
                    location.href = "http://127.0.0.1/移动端2/login/";
                } else if(data.code == "3"){
                    good(id,function(data){
                        if(data.code == "0"){
                            $("#goodBtn").css("color","red");
                            goodNub++;
                            isGetGoodState = false;
                            $(".work-aside .good").text('有'+goodNub+'人觉得很赞');
                        }
                    }); 
                }
               
            });
        })
    })

    // 是否点赞
    isGood(id,function(data){
        //console.log(data);
        if(data.code == "0"){
            $("#goodBtn").css("color","red");
        }
    })
   
    
    
     // let pageScroll = new BScroll($(".page .wrap").get(0),{
    //     tap: true,
    //     pullUpLoad: {
    //         threshold: 50
    //     }
    // });
})