import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat message";
const SOCKET_SERVER_URL = "http://localhost:8080";

const useChat = (roomId) => {
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
      for(var i = 0 ; i < allmessage.length; i ++){
        allmessage[i].classs = "message-item received-message"
      }
      setMessages((messages) => [...messages, allmessage]);
  });


    socketRef.current.on('send message', (newmessage) => {
    console.log("send message");
    newmessage.classs = "message-item received-message"
    setMessages((messages) => [...messages, newmessage]);

  });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);



  const sendMessage = (messageBody , request) => {
    messageBody.idsocket = socketRef.current.id
    socketRef.current.emit(request, messageBody);
    messageBody.classs = "message-item my-message"
    setMessages((messages) => [...messages, messageBody]);



  };

  return { messages, sendMessage };
};

export default useChat;
