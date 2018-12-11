import React,{Component} from "react";
import ROUTER from "./router/router";
import ROUTERCOMPONENT from "./router/router-component";
import {Route,Switch} from "react-router-dom";
import Header from "./common/components/header";
export default class App extends Component{
    render(){
        return <div  id="todoApp">
            <Header/>
            <Switch>
            {
                ROUTER.map((item,index)=>{
                    return (<Route
                        key={index}
                        path={item.path}
                        exact={item.exact}
                        render={(props)=>{
                            return ROUTERCOMPONENT[index].render(props);
                        }}
                    />)
                })
            }
            </Switch>
        </div>
    }
}