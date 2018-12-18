import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from './components/Chat';

const App = () => (
    <div>
        <h2>Hello React</h2>
        <Chat/>
    </div>
)


ReactDOM.render(<App/>, document.getElementById('root'));