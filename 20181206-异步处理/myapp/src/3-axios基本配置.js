import axios from "axios";
import qs from "querystring";
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
const HTTP = axios.create({
    baseURL: 'https://easy-mock.com/mock/5c07bd11d292dd2dc4f9cb54/example_copy/',
    timeout: 3000,
    headers: {
        hehe: "cai"
    },
    responseType: "json",
    transformRequest:(data)=>{
        //console.log(data);
        return qs.stringify(data);
    },
    transformResponse:(data)=>{
       // console.log(data);
        data.miaov = "123";
        return data;
    },
    validateStatus:(status)=>{
        return status<400;
    },
    cancelToken: source.token
});

HTTP.post("tesst",{hehe:123,heihei:456})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    if(err.message !== "操作被用户取消了"){
        console.log(err);
    }
    
});

HTTP.get("gettww")
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    if(err.message !== "操作被用户取消了"){
        console.log(err);
    }
    
});
setTimeout(()=>{
    source.cancel("操作被用户取消了");
});


