import React,{Component} from "react";
import {Switch,NavLink,Route} from "react-router-dom";
import Index from "./view";
import About from "./view/about";
import Contact from "./view/contact";
export default class App extends Component{
    render(){
        return (
            <div id={"new-todo"}>
                <nav className={"nav"}>
                    <NavLink to={"/"} exact activeClassName={"active"}>首页</NavLink>
                    <span> | </span>
                    <NavLink to={"/about/19"}>关于我们</NavLink>
                    <span> | </span>
                    <NavLink to={"/about/12"}>关于我们2</NavLink>
                    <span> | </span>
                    <NavLink to={"/contact"}>联系我们</NavLink>
                </nav>
                <Switch>
                    <Route path={"/"} exact render={(location)=>{
                        return <Index {...location}/>
                    }}/>
                    <Route path={"/about/:dataid"} render={(location)=>{
                        return <About {...location}/>
                    }}/>
                    <Route path={"/contact"} render={(location)=>{
                        return <Contact {...location}/>
                    }}/>
                </Switch>
            </div>
        );
    }
}