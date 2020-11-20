import React from 'react';

import keyboard from '../images/keyboard.js';
import KeyboardButton from './keyboardButton.jsx';

var Footer = (props) => {

  var handleClick = (e) => {
    e.preventDefault();
    props.change.view('base');
    props.change.checkIn(new Date(0,0,0));
    props.change.checkOut(new Date(0,0,0))
  }


  return(
    <div className="footer">
      <KeyboardButton />
      <button className="clear-button" onClick={handleClick}>Clear dates</button>
    </div>
  )
}


export default Footer;

{/* <button className='keyboard-button' onClick={handleShow}>{keyboard.keyboard.keyboard}</button> */}

