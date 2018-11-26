isLogin(function(data){
    if(data.code == 0) {
        history.back();
    }
});

$(function(){
    dispatchTap($("#backBtn").get(0));
    $("#backBtn").on("tap",function(){
        history.back();
    });
    dispatchTap($(".to-register").get());
    $(".to-register").on("tap",function(){
        $(".login3d").css("transform","rotateY(-180deg)");
    });
    dispatchTap($(".to-login").get());
    $(".to-login").on("tap",function(){
        $(".login3d").css("transform","rotateY(0deg)");
    });

    // 验证码切换
    let verifyImg = $('<img src="'+getVerifySrc()+'"/>');
    dispatchTap(verifyImg);
    $(verifyImg).on('tap',function(){
        this.src = getVerifySrc();
    });
    $(".login-form .input-verify input").one("focus",function(){
        $(".login-form .input-verify").append(verifyImg);
    });
    /*
        xhr.withCredentials = true 携带cookie 
    */

    // 登陆
    let loginBtn = $(".login-form .input-btn");
    dispatchTap(loginBtn.get());
    let loginText = $('.login-form input[type="text"],.login-form input[type="password"]');
    loginBtn.on("tap",function(){
        login({
            username:loginText.eq(0).val(),
            password:loginText.eq(1).val(),
            verify: loginText.eq(2).val()
        },function(data){
            if(data.code == 0){
                alert("登陆成功");
                setTimeout(function(){
                    history.back();
                },200);
            } else {
                loginText.eq(2).val("");
                verifyImg.attr("src",getVerifySrc());
            }
        })
    });
    

});