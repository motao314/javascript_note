import React from 'react';
import {Redirect} from "react-router-dom";
import Index from "../view/index";
import Book from "../view/book";
import About from "../view/about";
import Details from "../view/detail";
import Page404 from "../view/page404";
import PostPage from '../view/postpage';
let routerComponent = [
    {
        render:()=>{
            return <Redirect to="/index" />
        }
    },{
        render:(props)=>{
            return <Index {...props} />
        }
    },{
        render:(props)=>{
            return <Book {...props} />
        }
    },{
        render:(props)=>{
            return <About {...props} />
        }
    },{
        render:(props)=>{
            return <Details {...props} />
        }
    },{
        render:(props)=>{
            return <PostPage {...props} />
        }
    },{
        render:(props)=>{
            return <Page404 {...props} />
        }
    }
];
export default routerComponent;