import React, {Component} from 'react';
import './MessageForm.css';
import PropTypes from 'prop-types';

export default class MessageForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: '',
            author: '', 
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleClick = this.onHandleClick.bind(this);
        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
    }


    onHandleChange(event){
        const target = event.target;
        const fieldName = target.name;

        this.setState({
            [fieldName]: target.value
        })
    }

    onHandleClick(){
        const { onSend } = this.props;
        const {input, author} = this.state;
        
         if(!input || !author){
             alert('Enter a text');
            return;
        }

        if(typeof onSend === 'function'){
            onSend(input, author);
            this.setState({
                input: '', 
                author: ''
            });
        }
    }

    onHandleKeyDown(event){
        if(event.keyCode === 13 && event.ctrlKey) {
            this.onHandleClick();
        }
    }

    render(){
        const {input, author} = this.state;
        return(
            <div className="forms-wrapper">
                 <textarea className="form-control input-form"
                    id="exampleFormControlTextarea1"
                    name="input"
                    placeholder="Enter your message"
                    value={input}
                    onKeyDown = {this.onHandleKeyDown}
                    onChange={this.onHandleChange}/>
         
            <input className="form-control author-input"
                    name="author" type="text" value={author} 
                    onKeyDown = {this.onHandleKeyDown}
                    onChange={this.onHandleChange} placeholder="Enter your name" />
            <button className="btn btn-outline-info btn-submit"
                        onClick={this.onHandleClick}>Send a message</button>
            
            </div>
        );
    }
}

MessageForm.propTypes = {
        onSend: PropTypes.func.isRequired,   
}