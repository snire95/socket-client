import React from 'react';
import X from '../X-icon.png'
const AllMessags = ({message , removeItem }) => {
  return (  
  <div>
    {message.map((messags)=>{
      const {_id,name,content,date,classs} = messags;
      return (
              <div key = {_id}  className = {classs}>
                <div className = "first-row">
                  <img src= {X} 
                      alt="" 
                      className = "X-button" 
                      onClick = {() => removeItem(_id,classs )}
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
