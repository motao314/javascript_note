import axios from "axios";
import qs from "querystring";
// axios.post("https://easy-mock.com/mock/5c07bd11d292dd2dc4f9cb54/example_copy/test",qs.stringify({hehe:123,hehei:456}))
// .then((res)=>{
//     console.log(res);
// })
axios.get("https://easy-mock.com/mock/5c07bd11d292dd2dc4f9cb54/example_copy/gettww",{
    params:{
        hehe:123,hehei:456
    }
})
.then((res)=>{
    console.log(res);
})
