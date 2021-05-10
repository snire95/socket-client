import React  from 'react';
import './Navbar.css';
import {Button,} from 'react-bootstrap'

const Navbar = () => {

  return (
    <nav>
      <div className='nav-center'>

        <div className='nav-header'>
                    <Button variant="success" href="signUp"  style={{margin: "5px"}}>Sign Up</Button> 
                    <Button variant="success" href="logIn" style={{margin: "5px"}}>Log in</Button> 
</div>
      </div>
    </nav>
  );
};

export default Navbar;