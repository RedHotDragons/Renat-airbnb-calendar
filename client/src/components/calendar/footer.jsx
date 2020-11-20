import React from 'react';

import keyboard from '../images/keyboard.js';
import KeyboardButton from './keyboardButton.jsx';

var Footer = (props) => {
  // render two buttons
  // clear dates returns to the base view
  // keyboard displays a modal with keyboard information
  // keyboard functionality has not been implemented yet **fix**

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

