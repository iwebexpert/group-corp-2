import React, {Component} from 'react';
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import './Chats.css';

export class ChatsForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            title: '',
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }
    onHandleChange(event){
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    }

    onHandleSubmit (){
        const { title } = this.state;
        const { onSend } = this.props;

        if (!title || title.trim().length == 0) {
            alert("Enter chat name");
            return;
        }

        if (typeof onSend === "function") {
            onSend(this.state);
            this.setState({ title: "" });
        }

    };
    render(){
        const {title} = this.state;
        return(
            <div className="chats-forms">
                 <TextField
                     label="Enter new chat name"
                     name="title"
                     type="text"
                     value={title}
                     onChange={this.onHandleChange}
                 />
                 <Fab
                     variant="round"
                     color="primary"
                     onClick={this.onHandleSubmit}

                 >
                     <AddIcon fontSize="small"/>
                 </Fab>
            
            </div>
        );
    }
}