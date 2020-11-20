import React from 'react';

import GuestModal from '../modals/guestModal.jsx';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      total: 1
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getTotal = this.getTotal.bind(this);
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
    e.stopPropagation();
    this.setState({
      show: false
    });
    console.log('hide', this.state);
  }

  getTotal(total) {
    this.setState({
      total: total
    });

  }


  render(){
    return (
      <div>
        <GuestModal
          handleClose={this.hideModal}
          show={this.state.show}
          getTotal={this.getTotal}
        />
        <div onClick={this.showModal} className="guests-container">
          <div className="date-checkin-container">
            <div className="dates-checkin">
              GUESTS
            </div>
            <div className='dates-add-date'>
              {this.state.total + ' guests'}
            </div>
          </div>

          <label className="guests-selector">
            <svg viewBox="0 0 18 18" focusable="false" style={{height:'16px', width:'16px', display:'block'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd"></path></svg>
          </label>

        </div>
      </div>


    );
  }
}

export default Guests;
