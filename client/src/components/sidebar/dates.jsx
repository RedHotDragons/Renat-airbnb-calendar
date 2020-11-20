import React from 'react';
import CalendarModal from '../modals/calendarModal.jsx';
import DoubleCalendarApp from '../doubleCalendar/DoubleCalendarApp.jsx'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal(e) {
    e.preventDefault();
    this.setState({
      show: true
    });
    console.log(this.state);
  }

  hideModal(e) {
    e.preventDefault();
    this.setState({
      show: false
    });
    console.log('hide', this.state);
  }

  render(){
    return (
      <div>
        <CalendarModal
          handleClose={this.hideModal}
          show={this.state.show}
        >
          <DoubleCalendarApp />
        </CalendarModal>
        <div onClick={this.showModal} className="dates-container">

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
      </div>
    );
  }
}

export default Dates;
