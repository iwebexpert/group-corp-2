import React from 'react';
import ReactDom from 'react-dom';



class Message extends React.Component{

    state = {
        count: 1,
        author: 'Client',
        messageList: [
            'Привет',
        ]
    }


    // Обновление состояния
    onAddMessage = (newmessage) => {
        
        const newCount = ++this.state.count;
        const list = this.state.messageList.push(`Новое сообщение №${newCount} `);

        this.setState( {
            newCount,
            author: 'Client',
            list,
            
        });

    };

    render(){
        return (
            <div className="chat">
                <ul>
                    {/*Проверка на случай, пустого массива  */}
                    {this.state.messageList && this.state.messageList.map((text) => (
                        <li  key={text}>{text} - <b>{this.state.author}</b></li>
                    ))}
                
                </ul>
                <button onClick={this.onAddMessage}>Добавить новое сообщение</button>
            </div>
        )
    }
}
ReactDom.render(
    <>
        <Message />
    </>
    , document.getElementById('root'));


