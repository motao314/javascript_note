import React,{Component} from 'react';
import {Switch,Route} from "react-router-dom";
import {Layout} from "antd";
import router from "./router/router";
import routerComponent from "./router/router-component";
import PageHeader from "./common/components/Header";
import PageFooter from "./common/components/footer";
export default class App extends Component {
    render(){
        let {Content} = Layout;
        return (
            <div>
                <Layout>
                    <PageHeader/>
                    <Content className={"page-main"}>
                        <Switch>
                            {router.map((item,index)=>{
                                return (<Route
                                    key = {index}
                                    path={item.path}
                                    exact={item.exact}
                                    render={routerComponent[index].render}
                                />)
                            })}
                        </Switch>
                    </Content>
                    <PageFooter/>
                </Layout>
            </div>
        )
    }
}

