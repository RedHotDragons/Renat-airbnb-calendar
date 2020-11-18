import React from 'react';

class DayRow extends React.Component {
  constructor(props) {
    super(props);

    // bind
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    if (e.target.classList.contains('available')) {
      this.props.handlers.click(Number(e.target.innerHTML));
    }
  }

  handleEnter (e) {
    e.preventDefault();
    if (e.target.classList.contains('available')) {
      this.props.handlers.enter(Number(e.target.innerHTML));
    }
  }

  handleExit (e) {
    e.preventDefault();
    if (e.target.classList.contains('available')) {
      this.props.handlers.exit(Number(e.target.innerHTML))
    }
  }

  render() {
    return (
      <tr>
        {this.props.week.map(day =>
          <td
            className={day.className}
            onMouseOver={this.handleEnter}
            onMouseLeave={this.handleExit}
            onClick={this.handleClick}
            style={day.style}
          >
            {day.day}
          </td>)}
      </tr>
    );
  }
}

export default DayRow;
