import React from 'react';

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="price-container">
        $95 / night
      </div>
    );
  }
}

export default Price;