import React from 'react';
import buttons from '../images/guestModalButtons.js';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: this.props.min,
      max: this.props.max,
      current: this.props.min,
      minusDisabled: true
    }
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
  }

  handlePlus (e) {
    e.preventDefault();
    if (this.props.total <= this.state.max) {
      this.setState({
        current: this.state.current + 1,
        minusDisabled: false
      })
    }
    if (this.props.update) {
      this.props.update(1);
    }
  }

  handleMinus(e) {
    e.preventDefault();
    if (this.state.current > this.state.min) {
      this.setState({
        current: this.state.current - 1,
        plusDisabled: false
      })
    }
    if (this.props.update){
      this.props.update(-1);
    }
    if (this.state.current === this.state.min) {
      this.setState({
        minusDisabled: true
      })
    }
  }

  render () {
    console.log(this.props);
    return (
      <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
        <button disabled={this.state.minusDisabled} onClick={this.handleMinus} className="guest-modal-button">{buttons.minus}</button>
        <div>{this.state.current}</div>
        <button disabled={this.props.plusDisabled} onClick={this.handlePlus} className="guest-modal-button">{buttons.plus}</button>
      </div>
    )
  }
}

export default Selector;