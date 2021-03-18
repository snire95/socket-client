// import React, { useState } from "react";
// import socketClient  from "socket.io-client";

// // import { Link } from "react-router-dom";

// // import "./Home.css";
// // const SERVER = "http://18.217.20.176:5000";
// const SERVER = "http://localhost:8080";
// var socket = socketClient (SERVER);
//   socket.on('connection', () => {
//     console.log(`I'm connected with the back-end`);
// });


// const Home = () => {
//    const [Name, setNewName] = useState('')

// //   const [roomName, setRoomName] = React.useState("");

// //   const handleRoomNameChange = (event) => {
// //     setRoomName(event.target.value);
// //   };
  
//   const NewName = (e) => {
//     e.preventDefault()
//     // console.log(Name);
//     // if(Name !== ''){
//       setNewName(Name);
//       document.getElementById("iconChat").classList.remove('remove');
//       document.getElementById("iconChat").classList.add('flex');
//       document.getElementById("enter-name").classList.remove('flex');
//       document.getElementById("enter-name").classList.add('remove');
    
//     // }
//     alert(`hi ${Name}`);
//     socket.emit("Recover messages",socket.id) 
//   };
//   return (
//         <div className="enter-name flex" id = "enter-name">
//           <p >Please enter your name</p>
//           <form className="center" onSubmit= {NewName}>
//             <button type ='submit' className= "SendMessage"> Send</button>
//             <input 
//               type='text' 
//               className ='boxText' 
//               value={Name} 
//               onChange={(e) => setNewName(e.target.value)}
//               />
//           </form>
//         </div>
//   );
// };

// export default Home;