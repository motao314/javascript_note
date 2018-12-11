import React,{Component} from 'react';
import HTTP from "../common/components/http";
class PostPage extends Component {
    state = {
        info:"",
        topic_id: ""
    }
    postData(){
        let {info} = this.state;
        HTTP.post("/topics",{
            title: "test测试发帖12345",
            tab: "dev",
            content: info
        }).then(res=>{
            console.log(res);
            this.setState({
                topic_id: res.data.topic_id
            })
        });
    }
    remove(){
        HTTP.post("/topic_collect/de_collect",{
            topic_id : this.state.topic_id
        }).then(function(res){
            console.log(res);
        });
    }
    render(){
        let {info} = this.state;
        return (<div className="wrap">
                <textarea 
                    value={info} 
                    onChange = {(e)=>{
                        this.setState({
                            info:e.target.value 
                        })
                    }}
                />
                <button 
                    type="button"
                    onClick = {()=>{
                        this.postData();
                    }}
                >提交主题</button>
                 <button 
                    type="button"
                    onClick = {()=>{
                        this.remove();
                    }}
                >删除主题</button>
        </div>)
    }
}
export default PostPage;

