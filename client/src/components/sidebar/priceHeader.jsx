import React from 'react';

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="price-container">
        <div className="price">
          <span>
            <span style={{fontWeight:'600', fontSize:"22px", lineHeight:"26px"}}>
              $95
            </span>
            <span style={{fontWeight: '400', fontSize: '16px', lineHeight: '20px', paddingLeft: '4px'}}>
              / night
            </span>
          </span>
        </div>

        <div className="review">
          <span>
            <span className="reviewsStar">&#9733;</span>
            <span style={{paddingLeft: '4px', fontWeight: '600', lineHeight:'20px'}}>4.0</span>
            <span style={{color:'rgb(113, 113, 113)', paddingLeft:'4px', fontSize:'14px', lineHeight:'18px'}}>(4)</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Price;