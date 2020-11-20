import React from 'react';

import Dates from './dates.jsx';
import Guests from './guests.jsx';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="form-container">
        <Dates />
        <Guests />
      </div>
    );
  }
}

export default Form;