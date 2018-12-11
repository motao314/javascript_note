export default function detail(detail={
    loading: false,
    data:{
        title:"",
        content:"",
        author:{
            loginname:"",
            avatar_url:""
        },
        replies:[],
        create_at: ""
    }

},action) {
    let {loading,data} = detail;
    switch(action.type){
        case "detail_loading":
            loading = true;
            return {
                loading,
                data:{
                    title:"",
                    content:"",
                    author:{
                        loginname:"",
                        avatar_url:""
                    },
                    replies:[],
                    create_at: ""
                }
            }
        case "detail_get":   
            return {
                loading: false,
                data: action.data
            }
    }    
    return detail;
}