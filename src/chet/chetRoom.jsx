import React, { useState } from "react";
// import socketClient  from "socket.io-client";
import X from '../X-icon.png'
import useChat from "./useChat";
import chat from './chat.svg';
import AllMessags from './AllMassags';


const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('')
  const [Name, setNewName] = useState('')

  const hendleSubmit = (e) => {
    e.preventDefault()
    var d = new Date();
    const NewMessage = {_id: new Date().getTime().toString(), 
      // idsocket: socket.id,
      name: Name,
      content: newMessage,
      date: '' + d.getHours()	+ ':' + d.getMinutes()	+ '',
    };
    if(newMessage !== ""){
      sendMessage(NewMessage, "chat message");
      setNewMessage('')
    }


  }
  
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

  const NewName = () => {
    if(Name !== ""){
      document.getElementById("iconChat").classList.remove('remove');
      document.getElementById("iconChat").classList.add('flex');
      document.getElementById("enter-name").classList.remove('flex');
      document.getElementById("enter-name").classList.add('remove');
    }

  };


  return(
    <div>
    <div className="enter-name flex" id = "enter-name">
          <p >Please enter your name</p>
          {/* <form className="center" onSubmit= {NewName}> */}
          <div className="center" >
            <button className= "SendMessage" onClick = {NewName}> Send</button>
            <input 
              type='text' 
              className ='boxText' 
              value={Name} 
              onChange={(e) => setNewName(e.target.value)}              />
              </div>
          {/* </form> */}
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
            <AllMessags message ={messages}/>
          </ol>


          <form className="x" onSubmit= {hendleSubmit}>
            <button type ='submit' className= "SendMessage"> Send</button>
            <input 
              type='text' 
              className ='boxText' 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)}
              />
          </form>
        </div> 
      </div>
  );


};
export default ChatRoom;

