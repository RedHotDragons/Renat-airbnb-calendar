import React from 'react';

var Headers = (props) => {


  return (
    <div className="header-container">
        <section className="main-header">
          <h2>{'Select Dates'}</h2>
        </section>

        <div className="mini-header">
          {`Minimum stay: ${14} nights`}
        </div>
    </div>
  );
};

export default Headers;




