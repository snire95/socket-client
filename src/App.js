
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap"
import './App.css';
import ChatRoom from "./chet/chetRoom";
import Navbar from './chet/Navbar';
import Singup from "./chet/Signup";
import LogIn from "./chet/logIn";
import MyRoom from "./chet/MyRoom";
import PrivateRoute from "./chet/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./chet/ForgotPassword"
import UpdateProfile from "./chet/UpdateProfile"

function App() {
  return (
    <main> 
      <Router>
        {/* <Navbar /> */}
        <AuthProvider>
          <Switch>
            <Container  > 
              <Route exact path= "/room/:roomId" component={ ChatRoom }/>
              <div className="d-flex align-items-center justify-content-center"style={{ minHeight: "100vh" }}>
              <div className= "w-100" style={{maxWidth:"400px"}}>
                <PrivateRoute exact path = "/MyRoom" component = {MyRoom} />   
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route  path= "/signUp" component = {Singup}/>
                <Route  path= "/logIn" component = {LogIn} />
                <Route  path= "/forgot-password" component = {ForgotPassword} />
              </div>
              </div>

            </Container>
          </Switch>
        </AuthProvider>
      </Router>
    </main>
  );
};


export default App;