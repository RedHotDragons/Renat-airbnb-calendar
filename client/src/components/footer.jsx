import React from 'react';

var Footer = (props) => {

  var handleClick = (e) => {
    e.preventDefault();
    props.change.view('base');
    props.change.checkIn(new Date(0,0,0));
    props.change.checkOut(new Date(0,0,0))
  }

  return(
    <div>
      <button onClick={handleClick}>Clear Dates</button>
    </div>
  )
}


export default Footer;