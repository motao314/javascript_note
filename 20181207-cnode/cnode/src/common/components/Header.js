import React from 'react';
import {Layout,Row, Col, Menu, Dropdown, Button, Icon} from "antd";
import {Link,NavLink,withRouter} from "react-router-dom";
import router from "../../router/router";
let linkRouter = router.filter(item=>item.title);
let menu = (pathname,style,theme,mode)=>{
    return (
        <Menu
            mode={mode}
            theme={theme}
            style={style}
            breakpoint={"xl"}
        >
            {
                linkRouter.map((item,index)=>{
                    return (
                        <Menu.Item
                            key={index}
                            className = {(pathname&&pathname.indexOf(item.path) > -1)?"ant-menu-item-selected":""}
                        >
                            <NavLink to={item.path}>{item.title}</NavLink>
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    );
}
function PageHeader(props) {
    let {pathname} = props.location;
    return (
        <Layout.Header className={"page-header"}>
            <div className={"page-header-con"}>
                <Row gutter={16}>
                    <Col lg={6} xs={24} >
                        <h1 id="logo">
                            <Link to={"/index"}>
                                <img src={require("../static/img/logo.svg")} />
                            </Link>
                        </h1>
                    </Col>
                    <Col lg={18} xs={0} >
                        {menu(pathname,{lineHeight:"64px"},"dark","horizontal")}
                    </Col>
                    <Col lg={0} xs={24} className={"menu-xs"}>
                        <Dropdown  overlay={menu("",{width:"120px"},"light")} trigger={["click"]} >
                            <Button><Icon type="bars" /></Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        </Layout.Header>
    );
}
export default withRouter(PageHeader)

