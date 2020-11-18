import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="guests-container">

        <div className="date-checkin-container">
          <div className="dates-checkin">
            GUESTS
          </div>
          <div className='dates-add-date'>
            1 guest
          </div>
        </div>

        <label className="guests-selector">
          <svg viewBox="0 0 18 18" focusable="false" style={{height:'16px', width:'16px', display:'block'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd"></path></svg>
        </label>

      </div>


    );
  }
}

export default Guests;
