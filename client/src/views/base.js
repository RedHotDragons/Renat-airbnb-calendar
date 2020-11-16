import React from 'react';

import Headers from '../components/headers.jsx';
import Calendar from '../components/calendar.jsx';

class Base extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Headers
          view={'base'}
        />
        <Calendar
          view={'base'}
        />
      </div>
    );
  }
}

export default Base;