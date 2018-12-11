import React,{Component} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Page404 from "./404";
export default class App extends Component {
    render(){
        return (<div className="app">
                <nav>
                    <NavLink
                        to={"/"} exact
                        activeClassName={"active"}
                    >首页</NavLink>
                    <span> | </span>
                    <NavLink to={"/about"}>关于我们</NavLink>
                    <span> | </span>
                    <NavLink to={"/contact"}>联系我们</NavLink>
                </nav>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About}/>
                    <Route path="/contact" exact strict component={Contact}/>
                    <Route component={Page404}/>
                </Switch>
        </div>)
    }
}