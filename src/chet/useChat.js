import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'js-cookie';

const NEW_CHAT_MESSAGE_EVENT = "chat message";
const SOCKET_SERVER_URL = "http://localhost:8080";

const useChat = (roomId) => {
  console.log(roomId);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socketRef.current.on('allMessage', (allmessage) => {
      const user = Cookies.get("user")
      if(user !== undefined){
        console.log(user);
        var User = JSON.parse(user)
        var name = User.name
      }
      for(var i = 0 ; i < allmessage.length; i ++){
        if(allmessage[i].name === name){
          allmessage[i].classs = "message-item my-message"
        }else{
          allmessage[i].classs = "message-item received-message"
        }
        setMessages((messages) => [...messages, allmessage[i]]);
      }
  });
    socketRef.current.on('send message', (newmessage) => {
    console.log("send message");
    newmessage.classs = "message-item received-message"
    setMessages((messages) => [...messages, newmessage]);

  });
    socketRef.current.on('delete', (id) => {
      console.log(id);
    setMessages((messages) =>  messages.filter(item => item._id !== id));
  });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);



  const sendMessage = (messageBody , request) => {

    if(request ==="new User"){
      console.log("new User");

      socketRef.current.emit(request, messageBody);
    }
    if(request ===  "delete message"){
      console.log("message");
      socketRef.current.emit(request, messageBody);

      setMessages(messages.filter(item => item._id !== messageBody));
    }
    if(request === "chat message"){
            console.log("send message");

      messageBody.idsocket = socketRef.current.id
      socketRef.current.emit(request, messageBody);
      messageBody.classs = "message-item my-message"
      setMessages((messages) => [...messages, messageBody]);
    }

  };

  return { messages, sendMessage };
};

export default useChat;
