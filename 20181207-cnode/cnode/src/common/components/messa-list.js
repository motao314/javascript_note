import React,{Component} from 'react';
import {Card, Avatar,List} from "antd";

export default class MessageList extends Component {
    render(){
        console.log(this.props);
        let {replies} = this.props
        return (
            <Card
                title={replies.length + "条留言"}
                className = "message-list"
                type="inner"
            >
                <List
                    dataSource={replies}
                    renderItem={
                        item=>{
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                       avatar={<Avatar src={item.author.avatar_url}/>}
                                       description={
                                           <div style={{
                                               width: "100%"
                                           }}>
                                                <a>{item.author.loginname}</a>
                                                <span>  发表于{item.create_at}</span>
                                           </div>
                                       }
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:item.content
                                        }}
                                    >
                                    </div>
                                </List.Item>
                            )
                        }
                    }
                >

                </List>
            </Card>
        )
    }
}