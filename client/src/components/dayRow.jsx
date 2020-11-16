import React from 'react';

class DayRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserved: this.props.reservedDates,
      styledWeek: null
    };

    // styles
    this.disabledStyle = {
      color: 'rgb(177,177,177)',
      textDecoration: 'line-through'
    };
    this.clickedStyle = {
      border: '1px solid black',
      borderRadius: '100%',
      color: 'white',
      backgroundColor: 'black',
    };
    this.hoverStyle = {
      border: '1.5px solid black',
      borderRadius: '100%',
    }
    this.highlightStyle = {
      backgroundColor: 'lightgrey'
    }

    // initialize variables from props
    this.checkIn = this.props.clicked.checkIn;
    this.checkOut = this.props.clicked.checkOut;

    // bind
    this.styleWeek = this.styleWeek.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  componentDidUpdate() {
    this.checkIn = this.props.clicked.checkIn;
    this.checkOut = this.props.clicked.checkOut;
    this.styleWeek();
  }

  createWeek () {
    // create an array which contains objects describing the day number and
    // css style for each day in the week. If it is the first week, add no
    // text for days that are not part of this month. If it is
    // the last week, add no text for days that are not part of this
    // calendar month
    var day = this.props.info.day;
    var start = this.props.info.startOn;

    var week = [];
    if (start != 0) {
      // special case for first week
      for (let i =0; i<7; i++) {
        if (i<start) {
          week.push({day:"", month:this.props.month, year:this.props.year});
        } else {
          week.push({day:day, month:this.props.month, year:this.props.year});
          day++;
        }
      }
    } else {
      for (let i =0; i<7; i++) {
        if (day <= this.props.total) {
          week.push({day:day, month:this.props.month, year:this.props.year});
          day++;
        } else {
          week.push({day:"", month:this.props.month, year:this.props.year});
        }
      }
    }
    return week;
  }

  datesAreEqual(obj, date) {
    return obj.month  === date.getMonth() && obj.year===date.getFullYear() && obj.day === date.getDate()
  }

  styleWeek() {
    // given the week (from createWeek()) and a list of all the days that are reserved
    // (from props), give each day the appropriate style and then return
    // an array with all the day objects
    const styledWeek = []
    const week = this.createWeek();
    const reserved = this.state.reserved;

    for (let day of week) {
      if (reserved.includes(day.day)) {
        day.style = this.disabledStyle;
        day.className = "unavailable";
      } else {
        if (this.props.view === 'base') {
          day.style = {};

        } else if (this.props.view === 'start') {
          if (this.datesAreEqual(day,this.checkIn)) {
            day.style = this.clickedStyle;
          } else {
            day.style = {};
          }

        }
        else if (this.props.view === 'end') {
          if (this.datesAreEqual(day,this.checkIn)) {
            day.style = this.clickedStyle;
          } else if (this.datesAreEqual(day,this.checkOut)) {
            day.style = this.clickedStyle;
          } else {
            day.style = {};
          }

        }
        day.className = "available";
      }



      styledWeek.push(day);
    }
    this.state.styledWeek = styledWeek;
  }

  updateStyle (clickedDay, style){
    for (let day of this.state.styledWeek) {
      if (day.day === clickedDay) {
        day.style = style
        break;
      }
    }
    this.setState({
      styledWeek: this.state.styledWeek
    });

  }

  handleClick (e) {
    e.preventDefault();
    if (e.target.classList.contains('available')) {
      if (this.checkIn.toString() === new Date(0,0,0).toString()) {
        this.props.handleClick(Number(e.target.innerHTML));
      } else if (this.checkOut.toString() === new Date(0,0,0).toString()){
        this.props.handleClick(Number(e.target.innerHTML));
      }

    }
  }

  handleEnter (e) {
    e.preventDefault();
    if (e.target.classList.contains('available')&& Number(e.target.innerHTML) !== this.checkIn.getDate() && Number(e.target.innerHTML) !== this.checkOut.getDate()) {
      this.updateStyle(Number(e.target.innerHTML), this.hoverStyle);
    }
  }

  handleExit (e) {
    e.preventDefault();
    if (e.target.classList.contains('available') && Number(e.target.innerHTML) !== this.checkIn.getDate() && Number(e.target.innerHTML) !== this.checkOut.getDate()) {
      this.updateStyle(Number(e.target.innerHTML), {});
    }
  }

  render() {
    if (!this.state.styledWeek) {
      this.styleWeek();
    }
    // this.styleWeek();
    return (
      <tr>
        {this.state.styledWeek.map(day =>
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
