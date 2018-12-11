import React, { Component } from 'react';
import {NavLink,withRouter} from "react-router-dom";
import router from "../../router/router";
function getDisplay(path,doneData,unDoneData){
    let style = {};
    if(path=="/done"){
        style.display = doneData.length == 0?"none":"block";
    } else if(path=="/undone"){
        style.display = unDoneData.length == 0?"none":"block";
    }
    return style;
}
class Header extends Component {
    render(){
        let {match,data,doneData,unDoneData} = this.props;
        let url = match.path;
        let routerData = router.filter(item=>item.path);
        let title = router.filter(item=>item.path==url)[0].title;
        return (
            <header>
                <h2 className="title">{title}</h2>
                <nav className="nav" style={{
                    visibility: data.length==0?"hidden":"visible"
                }}>
                    {routerData.map((item,index)=>{
                        return (<NavLink 
                                    to={item.path}
                                    key={index}
                                    exact={item.exact}
                                    activeClassName = "active"
                                    style = {
                                    getDisplay(item.path,doneData,unDoneData)
                                    }
                                >
                                {/*{
            display: (item.path=="/done"&&doneData.length==0
                ?"none":(item.path=="/undone"&&unDoneData.length==0?"none":"block")) 
                                    }*/}
                                    {/*判断如果当前是未完成项，并且未完成数据为0，则 none,否则如果当前是已完成项 并且已完成项为0则none 否则显示 */}
                                    {item.title}
                                </NavLink>)
                    })}
                </nav>
            </header>
        );
    }
}
export default withRouter(Header);