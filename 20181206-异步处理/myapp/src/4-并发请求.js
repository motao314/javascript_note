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
// axios.all([
//     HTTP.get("gettww"),
//     HTTP.post("test")
// ])
// .then((arg)=>{
//     console.log(arg);
// });

// axios.all([
//     HTTP.get("gettww"),
//     HTTP.post("test")
// ])
// .then(axios.spread((data1,data2)=>{
//     console.log(data1,data2);
// }));