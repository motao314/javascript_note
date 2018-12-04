import React, { Component } from 'react';
import Header from '../common/components/header';
import List from "../common/components/list";
export default class ListView extends Component {
    render(){
        let {match,data,doneData,unDoneData} = this.props;
        let nowData = null;
        let url = match.path;
        console.log(this.props);
        switch (url) {
            case "/":
                nowData = data;
                break;
            case "/done":
                nowData = doneData;
                break;
            case "/undone":
                nowData = unDoneData;
                break;    
        }
        return (<div>
            <Header
                {...this.props}
            />
            <List data={data} />
        </div>);
    }
}