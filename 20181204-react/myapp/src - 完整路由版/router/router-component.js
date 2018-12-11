import React from "react";
import ListView from "../view/list";
import AddView from "../view/add";
import Page404 from "../view/page404";
let routerComponent = [
    (arg)=>{
        return <ListView {...arg} />
    },
    (arg)=>{
        return <AddView {...arg}/>
    },
    (arg)=>{
        return <ListView {...arg}/>
    },
    (arg)=>{
        return <ListView {...arg}/>
    },
    (arg)=>{
        return <Page404 {...arg}/>
    }
];
export default routerComponent;