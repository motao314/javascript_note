import React,{Component} from "react";
import ROUTER from "../../router/router";
import {NavLink,withRouter} from "react-router-dom";
let router = ROUTER.filter(item=>item.path);
class Header extends Component{
    render(){
        let path = this.props.location.pathname;
        let title = router.filter(item=>item.path === path)[0].title;
        return (<header>
                <h2 className={"title"}>{title}</h2>
                <nav className={"nav"}>
                    {
                        router.map((item,index)=>{
                            return (<NavLink
                                key={index}
                                to={item.path}
                                exact={item.exact}
                                activeClassName={"active"}
                            >
                                {item.title}
                            </NavLink>)
                        })
                    }
                </nav>
        </header>);
    }
}
export default withRouter(Header);