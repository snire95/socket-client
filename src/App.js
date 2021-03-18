import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import socketClient  from "socket.io-client";
// import chat from './chat.svg';
import './App.css';
// import AllMessags from './chet/AllMassags';
// import X from './X-icon.png'
// import Home from "./chet/Home";
import ChatRoom from "./chet/chetRoom";

// const ChatRoom = require('../src/chet/chetRoom').ChatRoom;
// const viewMessages = require('../src/chet/chetRoom').viewMessages;

// const SERVER = "http://18.217.20.176:5000";
// const SERVER = "http://localhost:8080";
// var socket = socketClient (SERVER);
//   socket.on('connection', () => {
//     console.log(`I'm connected with the back-end`);
// });

function App() {
    return (
      <main>
    <Router>
      <Switch>
        {/* <Route exact path="/" component={ChatRoom} /> */}
        <Route exact path="/:roomId" component={ ChatRoom } />
      </Switch>
    </Router>
        {/* <ChatRoom/>  */}
      </main>
    );
};


export default App;