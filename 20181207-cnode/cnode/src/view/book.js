import React,{Component} from 'react';
import {Card,Breadcrumb } from "antd";
import {Link} from "react-router-dom";
import data from "../common/static/data/book-data";
export default class Book extends Component {
    render(){
        return <div className={"wrap"}>
            <Card
                headStyle={{
                    background:"#f6f6f6"
                }}
                title={
                    (
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={"/index"}>主页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>新手教程</Breadcrumb.Item>
                        </Breadcrumb>
                    )
                }
            >
                <div
                    className={"static-html"}
                    dangerouslySetInnerHTML={{
                        __html:data
                    }}
                ></div>
            </Card>
        </div>
    }
}

