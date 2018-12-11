let router = [
    {
        path: "/",
        exact:true
    },{
        path: "/index",
        title: "首页",
        exact:false
    },{
        path: "/getstart",
        title: "新手入门",
        exact:false
    },{
        path: "/about",
        title: "关于",
        exact:false
    },{
        path: "/details/:id",
        exact:false
    },{
        path: "/postpage",
        title: "提交新主题",
        exact:false
    },{
        path: ""
    }
];
export default router;