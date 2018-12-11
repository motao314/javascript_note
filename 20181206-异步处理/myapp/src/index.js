import axios from "axios";
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
const HTTP = axios.create({
    baseURL: 'https://easy-mock.com/mock/5c07bd11d292dd2dc4f9cb54/example_copy/',
    timeout: 3000,
    cancelToken: source.token
});

// 拦截请求
HTTP.interceptors.request.use(function(config){
    //在发送请求之前做某事
    console.log("请求",config);
    return config;
});
// 拦截响应
HTTP.interceptors.response.use(function(config){
    //在发送请求之前做某事
    console.log("响应",config);
    config.data.miaov = "123213";
    return config;
})


HTTP.get("gettww")
.then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});

