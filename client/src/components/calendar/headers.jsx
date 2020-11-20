import React from 'react';

var Headers = (props) => {

  var difference = (date1, date2) => {
    // return the day difference between 2 dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }

  var formatDate = (date) => {
    // turn number representation of months into string representation and format the
    // end view header
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  // all headers based on the current view
  // the minimum stay is currently hardcoded and should be refactored to get
  // min stay from a database *****fix*******
  var mainText = {
    base: "Select check-in date",
    start: 'Select check-out date',
    end: `${difference(props.checkIn, props.checkOut)} nights in ${'Cottonwood'}`
  };
  var miniText= {
    base: "Add travel dates for exact pricing",
    start: `Minimum stay: ${14} nights`,
    end: `${formatDate(props.checkIn)} - ${formatDate(props.checkOut)}`
  };


  return (
    <div className="header-container">
        <section className="main-header">
          <h2>{mainText[props.view]}</h2>
        </section>

        <div className="mini-header">
          {miniText[props.view]}
        </div>
    </div>
  );
};

export default Headers;




