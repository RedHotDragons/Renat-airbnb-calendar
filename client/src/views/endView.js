import React from 'react';

import Headers from '../components/headers.jsx';
import Calendar from '../components/calendar.jsx';

class EndView extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Headers />
        <Calendar />
      </div>
    );
  }
}

export default EndView;