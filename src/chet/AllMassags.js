import React from 'react';
import { useEffect} from "react";
import ReactDOM from 'react-dom';

import X from '../X-icon.png'
// import useChat from "./useChat";

var allMessage = []

const AllMessags = ({message}) => {
  console.log(allMessage);
  console.log(message.length);
  if (message.length === 1){
    if(undefined === message[0].length){
          allMessage.push( message.pop());
    }else{
      allMessage = message[0]
    }
  }
  if(message.length > 1 ){
    allMessage.push( message.pop());
  }
  // useEffect(() => {

  const delet = (id) => {
    var x
    for(var i=0; i <allMessage.length;i++){
      if(allMessage[i]._id === id){
        x =i
      }

    }
      console.log(x); 
      
    allMessage.splice(x,1) 
      // allMessage.pop(i)
    

  }
    // });
  return (
    
  <div>
    {allMessage.map((messags)=>{
      const {_id,name,content,date,classs} = messags;
      return (
              <div key = {_id}  className = {classs}>
                <div className = "first-row">
                  <img src= {X} alt="" className = "X-button" onClick = {
                    () => {
                      console.log(_id);
                      delet(_id);
                  }}
                    ></img>
                  <li className = "name-massage">{name}</li>
                </div>
                <li className = "content-massage">{content}</li>
                <li className = "date-massage">{date}</li>
              </div>
      );
    })}
    
  </div>
  );
};

export default AllMessags;
