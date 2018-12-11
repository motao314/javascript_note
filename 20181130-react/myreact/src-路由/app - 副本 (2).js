import React,{Component} from "react";
import {NavLink, Route} from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
export default class App extends Component {
    render(){
        return (<div className="app">
                <nav>
                    <NavLink
                        to={"/"} exact
                        activeClassName={"active"}
                        isActive={(p)=>{
                           return true;
                        }}
                    >首页</NavLink>
                    <span> | </span>
                    <NavLink to={"/about"}>关于我们</NavLink>
                    <span> | </span>
                    <NavLink to={"/contact"}>联系我们</NavLink>
                </nav>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About}/>
                <Route path="/contact" exact strict component={Contact}/>
        </div>)
    }
}