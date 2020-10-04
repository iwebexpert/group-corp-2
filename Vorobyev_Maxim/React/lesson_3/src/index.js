import React from 'react';
import ReactDom from 'react-dom';
import {Messenger} from './components/Messenger';
import {Layout} from './components/Layout';
import {AudioMessage} from './components/AudioMessage'

ReactDom.render(
  <>
    <AudioMessage/>
    <Layout/>
  </>
  , document.getElementById('root'));