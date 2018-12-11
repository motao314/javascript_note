import React,{Component} from "react";
import {NavLink,Route,Switch} from "react-router-dom";
import Login from "./view/login";
import Regster from "./view/regster";
export default class App extends Component{
    render(){
        return (<div>
            <header>
                <NavLink to="/">登录</NavLink>
                <span> | </span>
                <NavLink to="/regster">注册</NavLink>
            </header>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/regster" exact component={Regster} />
            </Switch>
        </div>)
    }
}