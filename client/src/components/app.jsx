import React from 'react';

import CalendarApp from './calendar/CalendarApp.jsx'
import BookingForm from './sidebar/bookingForm.jsx';

class App extends React.Component {


  render () {
    return (
      <div>
        <CalendarApp />
        <BookingForm />
      </div>
    );
  }
}

export default App;