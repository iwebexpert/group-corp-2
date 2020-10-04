import React, {Component} from 'react';
import './audioMessage.scss';
import Recorder from 'record-audio-js';

export class AudioMessage extends Component {
  render() {
    const {audio} = this.props;
    return ( 
      <>
        <button id="recordButton">start</button>
        <button id="stopButton">stop</button>
        <div id="list">{audio}</div>
      </>
    );
  }
} 