import axios from "axios";
import qs from "querystring";
const HTTP = axios.create({
    baseURL:"https://cnodejs.org/api/v1",
    transformRequest:(res)=>{
        res.accesstoken = "482a456f-e58b-4f22-91e4-6e9f3b8d3fb5";
        return qs.stringify(res);
    }
});
export default HTTP;