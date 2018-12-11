import React,{Component} from 'react';
import {List,Avatar,Button,Tag} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import HTTP from "./http";
class IndexList extends Component {
    state={
        path: this.props.path
    }
    getData(){
        let {dispatch,page,limit,loading} = this.props;
        let {path} = this.state;
        let tab = path.split("/")[2];
        if(loading){
            return;
        }
        dispatch(function (dispatch) {
            dispatch({type:"loading"});
            HTTP.get("/topics",{
                params:{
                    tab,
                    page,
                    limit
                }
            }).then((res)=>{
                dispatch(
                    {
                        type: "list_add",
                        data: res.data.data
                    }
                );
            });
        });
    }
    changeData(){
        let {dispatch,limit} = this.props;
        let {path} = this.state;
        let tab = path.split("/")[2];
        dispatch(function (dispatch) {
            dispatch({type:"loading"});
            HTTP.get("/topics",{
                params:{
                    tab,
                    page:1,
                    limit
                }
            }).then((res)=>{
                dispatch(
                    {
                        type: "list_change",
                        data: res.data.data
                    }
                );
            });
        });
    }
    componentDidMount() {
        this.getData();
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        let newPath = nextProps.path;
        let oldPath = this.state.path;
        if(newPath !== oldPath){
            this.state.path = newPath;
            this.changeData();
            return false;
        }
        return true;
    }
    render(){
        let loadMore = (<div style={{
            textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
        }}
        >
            <Button onClick={()=>{
                this.getData();
            }}>loading more</Button>
        </div>);
        let {data,loading} = this.props;
        return (<div>
            <List
                itemLayout="horizontal"
                loading={loading}
                dataSource={data}
                loadMore={loadMore}
                renderItem={item=>{
                return (<List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.author.avatar_url} />}
                        title={(<div>
                            <Tag>{item.tab}  </Tag>
                            <a>{item.author.loginname}</a>
                        </div>)}
                        description={<h3><Link to={"/details/"+item.id}>{item.title}</Link></h3>}
                    />
                </List.Item>)
            }}/>
        </div>)
    }
}
export default connect(state=>({...state.indexlist}))(IndexList);

