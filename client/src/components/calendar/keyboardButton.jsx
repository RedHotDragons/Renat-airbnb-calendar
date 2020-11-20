import React from 'react';
import keyboard from '../images/keyboard.js';
import KeyboardModal from '../modals/keyboardModal.jsx';

class KeyboardButton extends React.Component {
  // renders a modal when the button is clicked
  constructor(props) {
    super(props);
    this.state  = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({
      show: true
    });
  }
  hideModal() {
    this.setState({
      show: false
    });
  }


  render() {
    return (
      <div>
        <KeyboardModal show={this.state.show} handleClose={this.hideModal}>
          <header style={{fontSize: "18px", lineHeight: "22px", fontWeight: "600"}}>KeyBoard Shortcuts</header>
          <ul className="keyboard-list">
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">↵</span></div>
              <div style={{width: "70%"}}>Select the date in focus</div>
            </li>
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">←/→</span></div>
              <div style={{width: "70%"}}>Move backward (left) and forward (right) by one day</div>
            </li>
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">↑/↓</span></div>
              <div style={{width: "70%"}}>Move backward (up) and forward (down) by one week</div>
            </li>
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">PGUP/PGDN</span></div>
              <div style={{width: "70%"}}>Switch months</div>
            </li>
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">Home/end</span></div>
              <div style={{width: "70%"}}>Go to the first or last day of a week</div>
            </li>
            <li className="keyboard-list-item">
              <div style={{width:"30%"}}><span className="keyboard-list-span">?</span></div>
              <div style={{width: "70%"}}>Open this panel</div>
            </li>
          </ul>
        </KeyboardModal>
        <button className='keyboard-button' onClick={this.showModal}>{keyboard.keyboard}</button>
      </div>
    );
  }
}

export default KeyboardButton;

