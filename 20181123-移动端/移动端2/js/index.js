

$(function(){

    pageIsLogin();//判断是否登陆
    
    /* 导航切换 */
    dispatchTap($(".header-btn-left").get(0));
    $(".header-btn-left").on("tap",function(){
        $(".page").toggleClass("pageHide");
    });


    // 上拉加载更多
    $(".page").css("height",innerHeight);
    let pageScroll = new BScroll($(".page .wrap").get(0),{
        tap: true,
        pullUpLoad: {
            threshold: 50
        }
    });
    let pageNub = 1;
    let rows = 8;
    
    pageScroll.on("scrollStart",function(){
        $(".page").removeClass("pageHide");
    });
    pageScroll.on("pullingUp",function(){
        getIndexData(pageNub,rows,function(data){
            if(data.error){
                $(".workList .loadMore").removeClass("loadIn").html("<span>没有数据了</span>");
                pageScroll.closePullUp();
                return;
            }
            data.forEach(item => {
                let work = $(`<li>
                    <a href="./work/#${item.id}"><img src="${item.icon}">
                        <div class="workMask">
                            <h4 class="workTitle">${item.title}</h4><span class="iconfont icon-tuijian1">${item.good}</span><span
                                class="iconfont icon-liuyan">${item.message}</span>
                        </div>
                    </a>
                </li>`);
                $(".works").append(work);
                $(work).on("tap",function(){
                     location.href = this.children[0].href;   
                });
            });
            pageNub++;
            pageScroll.refresh();
            pageScroll.finishPullUp();
        });
    });


});