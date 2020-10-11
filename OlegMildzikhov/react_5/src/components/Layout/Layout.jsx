import React, {Component} from "react";
import {Header} from "../Messenger-Header/index";
import {MessageContainer} from "containers/MessengerContainer";
import {ChatAddFormContainer} from "../../containers/ChatAddFormContainer"
import {ChatList} from "../Chat-list";
import {chats} from '../Chats-data/ChatData';
import {Switch, Route, Link} from 'react-router-dom';
import {Profile} from "components/Chats-profile/Profile";
import {ChatAddForm} from "../ChatForm/ChatForm";
import "./Layout.css";

export  class Layouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: '',
            chatsList: [...chats],
        };
        this.maxId = 3;

       this.getBio = this.getBio.bind(this);
       // this.addItem = this.addItem.bind(this);
    }


    componentDidUpdate(prevProps, prevState) {
        
        const {info, chatsList} = this.state;
        console.log(info, chatsList);
        console.log('stats', info.userId);

            if(this.props.location.pathname.match(/chats/)){
                
                let title = +this.props.location.pathname.substring(7);
                let newInfo = chatsList[title].info[0];
                console.log('tit', title);
                if(info.userId != chatsList[title].info[0].userId){
                    console.log('test', this.props);   
                    this.setState(({info})=>{
                        return {
                        info: newInfo
                        };
                    });
                } 
                else {
                    return;
                } 
            }         
    }
  // addItem(body) {
  //       const newItem = {
  //           id: this.maxId++,
  //           title: body,
  //           messages: [
  //               {
  //                   id: 0,
  //                   author: 'WebDev',
  //                   text: 'Привет!'
  //               },
  //               {
  //                   id: 1,
  //                   author: 'WebDev',
  //                   text: 'Что нового?'
  //               },
  //           ],
  //           info: [
  //               {
  //                   userId: 43004333,
  //                   firstName: 'Это новый пользователь',
  //                   lastName: 'Я пока не знаю как внести инф',
  //                   age: 25,
  //                   photo: 'none'
  //               }
  //           ]
  //       };
  //       this.setState(({chatsList})=> {
  //           console.log('setst is work!');
  //           const newArr = [...chatsList, newItem];
  //           return {
  //               chatsList: newArr
  //           };
  //       });
  //   }

    getBio(e) {
        let info = null;
        const {chatsList} = this.state;
        if(this.props.location.pathname.match(/chats/g)){
        let title = +this.props.location.pathname.substring(7);
        console.log(chatsList[title].info[0]);
        info = chatsList[title];
        console.log('upload info',chatsList[title]);
        return info;
        }
        else{
            return info; 
        }
    }

    render() {
        console.log(this.props);
        const {info, chatsList} = this.state;
        console.log('render layout',chatsList);
        return (
            <div  className="container">
                <Header takeInfo = {this.getBio()}/>
                <div className="chatNmessWrapper">
                    <div className="chats--items">
                    <ChatList nameOfChats={chatsList} className="chat-list"/>
                        <ChatAddFormContainer/>
                    {/*<ChatAddForm*/}
                    {/*onAdd={this.addItem}/>*/}
                    </div>
                    <div className={'sfs'}>
                    <Switch>
                                <Route path="/chats/:id([0-9]+)" component={MessageContainer} exact />
                        <Route path="/profile/:title" render={(props) => <Profile {...props} name={info} />}
                               exact></Route>
                    </Switch>
                    
                    </div>
                </div>
            </div>)
    }
}