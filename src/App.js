import React, { useState } from "react";
import socketClient  from "socket.io-client";
import chat from './chat.svg';
import './App.css';
import massags from './data.js';
import AllMessags from './AllMassags';
import X from './X-icon.png'

// const SERVER = "http://18.217.20.176:5000";
const SERVER = "http://localhost:8080";
var socket = socketClient (SERVER);
  socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});

function App() {
  const [messageItems, setMessageItems] = useState(massags);
  const [newMessage, setNewMessage] = useState('')
  const [Name, setNewName] = useState('')

  socket.on('FromAPI', (respons) => {
    var newmessage = JSON.parse(respons)
    console.log('FromAPI');
    console.log(newmessage)
    newmessage.classs = "message-item received-message"
    if(newmessage.idsocket !== socket.id){
      setMessageItems([...messageItems, newmessage])
    }
  });
  const closeCate = () => {
    document.getElementById("boxChat").classList.add('remove');
    document.getElementById("iconChat").classList.remove('remove');
    document.getElementById("iconChat").classList.add('flex');

  }
  const openCate = () => {
    document.getElementById("iconChat").classList.add('remove');
    document.getElementById("boxChat").classList.remove('remove');
    document.getElementById("boxChat").classList.add('flex');

  }
  const hendleSubmit = (e) => {
    e.preventDefault()
    console.log(newMessage);
    var d = new Date();
    console.log( massags.length );
    const NewMessage = {id: new Date().getTime().toString(), 
      idsocket: socket.id,
      name: Name,
      content: newMessage,
      date: '' + d.getHours()	+ ':' + d.getMinutes()	+ '',
};
    socket.emit('chat message', JSON.stringify(NewMessage));
    console.log(NewMessage);
    NewMessage.classs = "message-item my-message"
    setMessageItems([...messageItems, NewMessage])
    setNewMessage('')
  }
  const NewName = (e) => {
    e.preventDefault()
    console.log(Name);
    if(Name !== ''){
      setNewName(Name);
      document.getElementById("iconChat").classList.remove('remove');
      document.getElementById("iconChat").classList.add('flex');
      document.getElementById("enter-name").classList.remove('flex');
      document.getElementById("enter-name").classList.add('remove');
    
    }
    alert(`hi ${Name}`)
  }

    return (
      <main>
        <div className="enter-name flex" id = "enter-name">
          <p >Please enter your name</p>
          <form className="center" onSubmit= {NewName}>
            <button type ='submit' className= "SendMessage"> Send</button>
            <input 
              type='text' 
              className ='boxText' 
              value={Name} 
              onChange={(e) => setNewName(e.target.value)}/>
          </form>
        </div>
        <div className = "iconChat remove" id = "iconChat" >
          <img src ={chat} alt="" onClick = {openCate} />
        </div>
        <div className = "boxChat remove" id = "boxChat"> 
        <div className = "top-strip">
          <img src= {X} alt="" className = "X" onClick = {closeCate}></img>
          <div className = "enabel">Enabling guests : </div>

        </div>
          <ol className = "messages-list">
            <AllMessags message ={messageItems}/>
          </ol>
          <form className="x" onSubmit= {hendleSubmit}>
            <button type ='submit' className= "SendMessage"> Send</button>
            <input 
              type='text' 
              className ='boxText' 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)}/>
          </form>
        </div> 
      </main>
    );
};


export default App;