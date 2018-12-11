import axios from "axios";
import qs from "querystring";
let HTTP_KUGOU = axios.create({
    baseURL:"/kg",
    transformRequest:(res)=>{
        return qs.stringify(res);
    }
});
HTTP_KUGOU.defaults.withCredentials = true;
export default HTTP_KUGOU;