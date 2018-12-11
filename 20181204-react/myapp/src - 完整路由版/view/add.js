import React, { Component } from 'react';
import Header from '../common/components/header';
import Add from '../common/components/add';
export default class AddView extends Component {
    render(){
        return <div>
            <Header {...this.props} />
            <Add {...this.props}/>
        </div>;
    }
}