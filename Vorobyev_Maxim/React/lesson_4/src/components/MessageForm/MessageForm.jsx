import React, {Component} from 'react';
import {Button, TextField, Fab} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import './messageForm.scss';
import Recorder from 'record-audio-js';

// URL = window.URL || window.webkitURL;
// var gumStream
// var rec
// var input
// var AudioContext = window.AudioContext || window.webkitAudioContext
// var audioContext

// document.addEventListener("DOMContentLoaded", ready);
// function ready() {
//   var recordingsList = document.getElementById("list");
// }

// function createDownloadLink(blob) {
//   var url = URL.createObjectURL(blob);
//   var au = document.createElement('audio');
//   var li = document.createElement('li');
//   au.controls = true;
//   au.src = url;
//   li.appendChild(au);
//   document.getElementById("list") .appendChild(li);
// }

export class MessageForm extends Component {
  state = {
    text: '',
    author: '',
    time: '',
    audio: false,
  };

  // startRecording() {
  //   console.log("recordButton clicked");
  //   const constraints = {audio: true, video: false};
  //   navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
  //     audioContext = new AudioContext();
  //     gumStream = stream;
  //     input = audioContext.createMediaStreamSource(stream);
  //     rec = new Recorder(input,{numChannels:1})
  //     rec.record();
  //     console.log("Recording started");
  //   });
  // }
 
  // stopRecording() {
  //   console.log("stopButton clicked");
  //   rec.stop();
  //   gumStream.getAudioTracks()[0].stop();
  //   rec.exportWAV(createDownloadLink);
  // }

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({[fieldName]: event.target.value});
  }

  handleMessageSend = () => {
    const {onSend} = this.props;
    const {text, author} = this.state;
    if (!author) {
      alert("Как вас зовут?");
      return;
    }
    if (!text) {
      alert("Введите сообщение");
      return;
    }
    if (typeof onSend === 'function') {
      onSend(this.state);
      this.setState({text: ''});
    }
  };

  handleKeyDownEnter = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.handleMessageSend();
    }
  }

  render() {
    const {text, author, audio} = this.state;
    return (
      <div>
        <hr/>
        <div className="sendMessageBlock">
          <div className="sendPhotoVoice">
            <AttachFileIcon className="clip"/>
            <KeyboardVoiceIcon className="voice" name="audio" onMouseDown={this.startRecording} onMouseUp={this.stopRecording}/> 
            <textarea placeholder="Type Message..." name="text" onChange={this.handleInputChange} onKeyDown={this.handleKeyDownEnter} value={text} type="text" className="mainSender"/>
          </div>
          <textarea placeholder="Type Author..." name="author" onChange={this.handleInputChange} onKeyDown={this.handleKeyDownEnter} value={author} type="text" className="mainSenderAuthor"/>
          <SendIcon onClick={this.handleMessageSend} className="sendIcon"/>
        </div>
      </div>
    );
  }
}

