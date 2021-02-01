import React from 'react';
import massags from './data';
import X from './X-icon.png'


const AllMessags = ({message}) => {
  return (<div>
    {message.map((messags)=>{
      const {id,name,content,date,classs} = messags;
      return (
              <div key = {id} className = {classs}>
                <div className = "first-row">
                  <img src= {X} alt="" className = "X-button"></img>
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
