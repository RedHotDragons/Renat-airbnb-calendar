import React from 'react';

import CalendarApp from './calendar/CalendarApp.jsx';
import BookingForm from './sidebar/bookingForm.jsx';

import DoubleCalendarApp from './doubleCalendar/doubleCalendarApp.jsx';

class App extends React.Component {


  render () {
    return (
      <div className="whole-container">
        <CalendarApp />
        <BookingForm />
      </div>
    );
  }
}

export default App;


// return (
//   <div className="whole-container">
//     <DoubleCalendarApp />
//   </div>
// );