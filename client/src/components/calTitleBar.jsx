import React from 'react';

var TitleBar = ({month, year, change}) => {

  var getMonth = () => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December']
    return months[month];
  }

  var handleClick = (e) => {
    e.preventDefault();
    change();
  }

  return(
    <div>
      {getMonth()} {year}
      <button onClick={handleClick}>></button>
    </div>
  );
}

export default TitleBar;