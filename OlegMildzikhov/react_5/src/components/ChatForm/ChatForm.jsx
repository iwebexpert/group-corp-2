import React, {Component} from "react";

export class ChatAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.text.length===0){
            alert('Введите название чата');
            return;
        }
        console.log(this.state.text);
        this.props.addNewChat(this.state.text);

        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="type here!"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text}
                />
                <button
                    type={"submit"}
                    className={"btn btn-outline-secondary"}
                >add
                </button>
            </form>
        )
    }
}
