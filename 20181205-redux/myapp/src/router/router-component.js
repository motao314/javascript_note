import React from "react";
import ListView from "../view/list";
import AddView from "../view/add";
import Page404 from "../view/page404";
const ROUTERCOMPONENT = [
    {
        path:"/",
        render:(props)=><ListView {...props} />
    },{
        path:"/add",
        render:(props)=><AddView {...props}/>
    },{
        path:"/done",
        render:(props)=><ListView {...props}/>
    },{
        path:"/undone",
        render:(props)=><ListView {...props}/>
    },{
        path:"",
        render:(props)=> <Page404 />
    }
];
export default ROUTERCOMPONENT;