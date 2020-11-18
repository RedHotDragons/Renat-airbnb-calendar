import React from 'react';

import Price from './priceHeader.jsx';
import Dates from './dates.jsx';
import Guests from './guests.jsx';
import Submit from './submit.jsx';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="booking-form-container">
        <Price />
        <Dates />
        <Guests />
        <Submit />
      </div>
    );
  }
}

export default BookingForm;