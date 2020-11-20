import React from 'react';

import Price from './priceHeader.jsx';
import Submit from './submit.jsx';
import Form from './form.jsx'

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="booking-form-outer-container">
        <div className="booking-form-inner-container">
          <Price />
          <Form />
          <Submit />
        </div>
      </div>
    );
  }
}

export default BookingForm;