import React from 'react';
function Ul(props){
    return (
        <ul>
            {
                props.data.map((item,index)=>{
                    return (
                        <li key={index}>
                            <p className={item.vip?"vip":""}>{item.username}</p>
                            <p className="message">{item.message}</p>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default Ul;