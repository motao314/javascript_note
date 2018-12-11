import axios from "axios";
import qs from "querystring";
let HTTP = axios.create({
    baseURL:"/miaov/",
    transformRequest:(res)=>{
        return qs.stringify(res);
    }
});
HTTP.defaults.withCredentials = true;
export default HTTP;