import React from 'react';

class Submit extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="submit-container">
        <button>Check availability</button>
      </div>
    );
  }
}

export default Submit;