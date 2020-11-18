import React from 'react';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="dates-container">

        <div className="date-checkin-container">
          <div className="dates-checkin">
            CHECK-IN
          </div>
          <div className='dates-add-date'>
            Add Date
          </div>
        </div>

        <div className="date-checkout-container">
          <div className="dates-checkout">
            CHECKOUT
          </div>
          <div className='dates-add-date'>
            Add Date
          </div>
        </div>

      </div>
    );
  }
}

export default Dates;
