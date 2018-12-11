import React,{Component} from 'react';
import {Menu,Row,Col} from "antd";
import {Link,withRouter} from "react-router-dom";
import indexRouter  from "../router/index-router";
import IndexList from "../common/components/indexList";

function getMenu(mode,path) {
    return (
        <Menu
            mode={mode}
        >
            {indexRouter.map((item,index)=>{
                return (<Menu.Item
                    key={index}
                    className={path==item.path?"ant-menu-item-selected":""}
                >
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>)
            })}
        </Menu>
    );
}
class Index extends Component {
    render(){
        let {pathname} = this.props.location;
        return (<div className={"wrap"}>
                  <Row>
                      <Col lg={0} xs={24}>
                          {getMenu("horizontal",pathname)}
                      </Col>
                      <Col lg={4} xs={0}>
                          {getMenu("inline",pathname)}
                      </Col>
                      <Col lg={20} xs={24}>
                          <IndexList path={pathname}/>
                      </Col>
                  </Row>
            </div>)
    }
}
export default withRouter(Index)

