import React,{Component} from 'react';
import {Card, Avatar} from "antd";
import {connect} from "react-redux";
import HTTP from "../common/components/http";
import MessageList from '../common/components/messa-list';
class Details extends Component {
    componentDidMount(){
        let {dispatch,match} = this.props;
        let {id} = match.params;
        dispatch(function(dispatch){
            dispatch({
                type:"detail_loading"
            });
            HTTP.get("/topic/"+id)
            .then((res)=>{
                dispatch({
                    type: "detail_get",
                    data: res.data.data
                })
            })
        });
    }
    render(){
        let {loading,data} = this.props;
        console.log(this.props);
        let title = data.title?(<div>
        <h2>{data.title}</h2>
        <div style={{
            display:"flex"        
        }}>
            <Avatar src={data.author.avatar_url} />
            <a>{data.author.loginname}</a>
            <p>发表于{data.create_at}</p>
        </div>
    </div>):"";
        return (<div className="wrap">
                <Card
                    loading = {loading}
                    title={
                        title
                    }
                
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.content
                        }}
                    >
                    </div>
                </Card>
                {data.replies.length>0?(<MessageList 
                    replies = {data.replies}
                />):""}
        </div>)
    }
}
Details = connect((state)=>{
    return {...state.detail}
})(Details);
export default Details;

