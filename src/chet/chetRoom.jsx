import React, { useState, useEffect } from "react";
// import socketClient  from "socket.io-client";
import X from '../X-icon.png'
import useChat from "./useChat";
import chat from './chat.svg';
import AllMessags from './AllMassags';
import Cookies from 'js-cookie';
import { useAuth } from "../contexts/AuthContext"


const ChatRoom = (props) => {
  console.log(props.match.params);
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('')
  const [Name, setNewName] = useState('')

  const readCookie = () => {
    const user = Cookies.get("user")
    console.log("cookies");
    if(user !== undefined){
        console.log(user);

      var User = JSON.parse(user)
      // if(User.room === roomId){
        setNewName(User.name)
      //   document.getElementById("iconChat").classList.remove('remove');
      //   document.getElementById("iconChat").classList.add('flex');
      //   document.getElementById("enter-name").classList.remove('flex');
      //   document.getElementById("enter-name").classList.add('remove');
      // }

    }
  }

  React.useEffect(() => {
    readCookie();
  },[])

  const hendleSubmit = (e) => {
    e.preventDefault()
    var d = new Date();
    const NewMessage = {_id: new Date().getTime().toString(), 
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

//   const NewName = () => {
//     const user = {name: Name ,room : roomId}
//     Cookies.set("user" + roomId, user )
//     if(Name !== ""){
//       document.getElementById("iconChat").classList.remove('remove');
//       document.getElementById("iconChat").classList.add('flex');
//       document.getElementById("enter-name").classList.remove('flex');
//       document.getElementById("enter-name").classList.add('remove');
//     }
// };

  const removeItem = (id, classMessage) => {
    console.log(classMessage);
    if(classMessage === "message-item my-message"){
        console.log("delete message");
        sendMessage(id, "delete message" )
    }
  }

  useEffect(() => {
    console.log("test");
    console.log(messages);
    localStorage.setItem('messages', messages);
  }, [messages]);

  return(
    <div>

    <div className = "iconChat " id = "iconChat" >
      <img src ={chat} alt="" onClick = {openCate} />
    </div>
    {/* <div className = "d-flex align-items-end"> */}
    <div className = "boxChat remove" id = "boxChat"> 
        <div className = "top-strip">
          <img src= {X} alt="" className = "X" onClick = {closeCate}></img>
          <div className = "enabel">Enabling guests : </div>
        </div>
          <ol className = "messages-list">
            <AllMessags message ={messages} removeItem = {removeItem}/>
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
      {/* </div> */}
      </div>
  );


};
export default ChatRoom;

