import React, { useState } from "react";
import socketClient  from "socket.io-client";
import chat from './chat.svg';
import './App.css';
import massags from './data.js';
import AllMessags from './AllMassags';
const SERVER = "http://18.217.20.176:5000";
var socket = socketClient (SERVER);
  socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});
function App() {

  const [messageItems, setMessageItems] = useState(massags);
  const [newMessage, setNewMessage] = useState('')
  socket.on('FromAPI', (respons) => {
    var newmessage = JSON.parse(respons)
    console.log('FromAPI');
    console.log(newmessage)
    newmessage.classs = "message-item received-message"
    if(newmessage.idsocket !== socket.id){
      setMessageItems([...messageItems, newmessage])
    }
    // setNewMessage('')
  });
  const hendleSubmit = (e) => {
    e.preventDefault()
    console.log(newMessage);
    var d = new Date();
    console.log( massags.length );
    const NewMessage = {id: new Date().getTime().toString(), 
      idsocket: socket.id,
      content: newMessage,
      date: '' + d.getHours()	+ ':' + d.getMinutes()	+ '',
};
    socket.emit('chat message', JSON.stringify(NewMessage));
    console.log(NewMessage);
    NewMessage.classs = "message-item my-message"
    setMessageItems([...messageItems, NewMessage])
    setNewMessage('')
  }
    return (
      <main>
        <div  className = "iconChat">
          <img src ={chat} alt="" />
        </div>
      
          <div className = "boxChat"> 
            <ol className = "messages-list">
            <AllMessags message ={messageItems}/>
            </ol>
            {/* <div className="x"> */}
            <form className="x" onSubmit= {hendleSubmit}>
            <button type ='submit' className= "SendMessage"> Send</button>
            <input 
            type='text' 
            className ='boxText' 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}/>
            </form>
            </div> 
          {/* </div>      */}
      </main>
    );
    };


export default App;