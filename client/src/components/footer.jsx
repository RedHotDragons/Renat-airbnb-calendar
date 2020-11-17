import React from 'react';

var Footer = (props) => {

  var handleClick = (e) => {
    e.preventDefault();
    props.change.view('base');
    props.change.checkIn(new Date(0,0,0));
    props.change.checkOut(new Date(0,0,0))
  }

  return(
    <div className="footer">
      <button className="clear-button" onClick={handleClick}>Clear dates</button>
    </div>
  )
}


export default Footer;