import React from 'react';
import ReactDom from 'react-dom';

import { Messenger } from 'components/Messenger';
import 'antd/dist/antd.css';

ReactDom.render(
	<>
		<Messenger />
	</>
	, document.getElementById('root'));