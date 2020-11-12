import React from 'react';

var TitleBar = ({month, year, changeForward, changeBack}) => {

  var getMonth = () => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December']
    return months[month];
  }

  var handleForward = (e) => {
    e.preventDefault();
    changeForward();
  }

  var handleBack = (e) => {
    e.preventDefault();
    changeBack();
  }

  return(
    <div className="title-bar-container">
      <button className="arrow-button" onClick={handleBack}>&lt;</button>
      {getMonth()} {year}
      <button className="arrow-button" onClick={handleForward}>&gt;</button>
    </div>
  );
}

export default TitleBar;