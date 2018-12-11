import React,{Component} from "react";
import {Link, Route} from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Contact2 from "./contact2";
export default class App extends Component {
    render(){
        return (<div className="app">
                <nav>
                    <Link to="/">首页</Link>
                    <span> | </span>
                    <Link to="/about">关于我们</Link>
                    <span> | </span>
                    {/*<Link to="/about/">关于我们</Link>*/}
                    {/*<span> | </span>*/}
                    <Link to="/contact">联系我们</Link>
                    <span> | </span>
                    {/*<Link to="/contact/">联系我们2</Link>*/}
                </nav>
                <Route path="/" exact component={Home} />
                {/*<Route path="/about" exact strict component={About}/>*/}
                <Route path="/about" component={About}/>
                <Route path="/contact" exact strict component={Contact}/>
                {/*<Route path="/contact/" exact strict component={Contact2}/>*/}
        </div>)
    }
}