import React from 'react';

class CalendarModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const showHideClassName = this.props.show ? "calendar-modal display-block" : "calendar-modal display-none";
    return (
      <div className={showHideClassName}>
      <section className="calendar-modal-main">
        {this.props.children}
        <button className="modal-close-button" onClick={this.props.handleClose}>
          Close
        </button>
      </section>
    </div>
    );
  }
}

export default CalendarModal;