import React from 'react';

class Submit extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="submit-container">
        <button className="submit-button"><span className="submit-text">Check availability</span></button>
      </div>
    );
  }
}

export default Submit;






{/* <form action="/payments/book?hosting_id=43356813" method="post">
  <input type="hidden" name="s" value="undefined">
    <input type="hidden" name="hosting_id" value="43356813">
      <input type="hidden" name="guest_currency" value="USD">
        <input type="hidden" name="checkin" value="undefined">
          <input type="hidden" name="checkout" value="undefined">
            <input type="hidden" name="number_of_guests" value="1">
              <input type="hidden" name="number_of_adults" value="1">
                <input type="hidden" name="number_of_children" value="0">
                  <input type="hidden" name="number_of_infants" value="0">
                    <input type="hidden" name="selected_cancellation_policy_id" value="undefined">
                      <input type="hidden" name="is_work_trip" value="false">
                        <button data-testid="homes-pdp-cta-btn" type="submit" class="_1ot1we5p">
                          <span class="_163rr5i">
                            <span class="_19di23v" style="background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%); --mouse-x:76.1719; --mouse-y:11.7647;">
                              </span>
                              </span>
                              <span class="_tcp689">Check availability </span>
                              </button>
                              </form> */}