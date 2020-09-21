import React, {Component} from 'react';

export default class Message extends Component{
    constructor(props){
        super(props);
    }
    
      render(){
        return(
            <div className="text">
                {this.props.text} - <b>{this.props.author}</b>
            </div>
        );
    }
}
