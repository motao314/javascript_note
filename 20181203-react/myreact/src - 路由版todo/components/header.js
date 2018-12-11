import React from "react";
import {NavLink} from "react-router-dom";
export default function Header (props){
    return (<header className={"header"}>
            <h2 className={"title"}>{props.title}</h2>
            <nav className={"nav"}>
                <NavLink to="/" exact activeClassName={"active"}>首页</NavLink>
                <span> | </span>
                <NavLink to="/add">添加事项</NavLink>
                <span> | </span>
                <NavLink to="/done">已完成事项</NavLink>
                <span> | </span>
                <NavLink to="/undone">未完成事项</NavLink>
            </nav>
    </header>);
}