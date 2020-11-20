import React from 'react';
import Selector from './guestModalSelector.jsx';



class GuestModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 1,
      max: 4,
      plusDisabled: false,
    };
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal(amount) {
    var plus = false;
    if (this.state.total + amount >= this.state.max) {
      plus = true;
    }
    this.setState({
      total: this.state.total + amount,
      plusDisabled: plus
    });
    this.props.getTotal(this.state.total + amount);

  }


  render() {
    const showHideClassName = this.props.show ? "guest-modal display-block" : "guest-modal display-none";
    return (
      <div onClick={this.props.handleClose} className={showHideClassName}>
        <section onClick={(e)=>{e.stopPropagation()}} className="guest-modal-main">
          <div className="guest-modal-description-container">
            <div className="guest-modal-description">
              Adults
            </div>
            <div style={{width:'40%'}}>
              <Selector
                min={1}
                max={3}
                plusDisabled={this.state.plusDisabled}
                total={this.state.total}
                update={this.updateTotal}
              />
            </div>
          </div>

          <div className="guest-modal-description-container">
            <div className="guest-modal-description">
              Children
              <span style={{fontSize: '12px',lineHeight:' 16px', fontWeight:'400', color:'rgb(117,117,117)'}}>Ages 2–12</span>
            </div>
            <div style={{width:'40%'}}>
              <Selector
                min={0}
                max={3}
                plusDisabled={this.state.plusDisabled}
                total={this.state.total}
                update={this.updateTotal}
              />
            </div>

          </div>

          <div className="guest-modal-description-container">
            <div className="guest-modal-description">
              Infants
              <span style={{fontSize: '12px',lineHeight:' 16px', fontWeight:'400', color:'rgb(117,117,117)'}}>Under 2</span>
            </div>
            <div style={{width:'40%'}}>
              <Selector
                min={0}
                max={4}
                total={0}
                plusDisabled={false}
              />
            </div>
          </div>

          <div style={{fontSize: '14px',lineHeight:' 20px',color: 'rgb(34, 34, 34)',marginBottom: '16px'}}>
            4 guests maximum. Infants don’t count toward the number of guests.
          </div>

          <button style={{fontSize: "16px", float:"right"}} className="clear-button" onClick={this.props.handleClose}>Close</button>
        </section>
      </div>
    );
  }

}

export default GuestModal;



