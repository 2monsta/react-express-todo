import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ToDo from './ToDO';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ToDo />, document.getElementById('root'));
registerServiceWorker();
