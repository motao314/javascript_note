import React,{Component} from "react";
import {Switch,NavLink,Route,Redirect,withRouter} from "react-router-dom";
import Index from "./view";
import About from "./view/about";
import Contact from "./view/contact";
import Page404 from "./view/page404";
class App extends Component{
    render(){
        console.log(this.props);
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
                    <Route path={"/404"} render={(location)=>{
                        return <Page404 {...location}/>
                    }}/>
                    <Route render={(location)=>{
                        return <Redirect to={"/404"} />
                    }}/>
                </Switch>
            </div>
        );
    }
}
export default withRouter(App);
// export default withRouter((props)=>{
//     return <App {...props} />;
// });