import React from 'react';

import Headers from './doubleHeaders.jsx';
import Calendar from './doubleCalendar.jsx';
import Footer from '../calendar/footer.jsx';

class DoubleCalendarApp extends React.Component {
  // renders two months next to each other
  // renders different headers and titlebar from the
  // single view calendar component

  // this view is rendered in the calendar modal from the booking form
  // should also be rendered instead of the single view if the page size
  // is big enough **fix**

  constructor(props) {
    super(props);

    // initialize current day, left month and right month
    this.currentDay = new Date();
    this.leftMonth = new Date();
    this.rightMonth = new Date();
    this.rightMonth.setMonth(this.leftMonth.getMonth() + 1);

    this.state = {
      view: 'base',
      checkIn: new Date(0,0,0),
      checkOut: new Date(0,0,0),
      closest: null,
      left: {
        year: this.leftMonth.getFullYear(),
        month: this.leftMonth.getMonth(),
        day: this.leftMonth.getDay(),
        current: true
      },
      right: {
        year: this.rightMonth.getFullYear(),
        month: this.rightMonth.getMonth(),
        day: this.rightMonth.getDay(),
        current: false
      }
    };

    // bind
    this.changeView = this.changeView.bind(this);
    this.changeCheckIn = this.changeCheckIn.bind(this);
    this.changeCheckOut = this.changeCheckOut.bind(this);
    this.changeClosest = this.changeClosest.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }


  // possible views:
  // base, start(check in day selected), end (check out day selected)
  changeView(view) {
    if (view === 'base') {
      this.setState({
        view: view,
        closest: null
      });
    } else {
      this.setState({
        view: view
      });
    }
  }

  changeCheckIn(date, closest) {
    this.setState({
      checkIn: date,
      closest: closest
    });
  }

  changeCheckOut(date) {
    this.setState({
      checkOut: date
    });
  }

  changeClosest(date) {
    this.setState({
      closest: date
    })
  }



  changeMonth(direction) {
    // change the calendar
    if (direction === 'forward') {
      this.leftMonth.setMonth(this.leftMonth.getMonth() + 1);
    } else {
      this.leftMonth.setMonth(this.leftMonth.getMonth() - 1);
    }

    var newCurrent = false;
    if ((this.currentDay.getFullYear() === this.leftMonth.getFullYear()) && (this.currentDay.getMonth() === this.leftMonth.getMonth())) {
      newCurrent = true;
    }

    this.rightMonth = new Date(this.leftMonth);
    this.rightMonth.setMonth(this.rightMonth.getMonth() + 1);


    this.setState({
      left: {
        month: this.leftMonth.getMonth(),
        year: this.leftMonth.getFullYear(),
        current: newCurrent
      },
      right: {
        month: this.rightMonth.getMonth(),
        year: this.rightMonth.getFullYear(),
      }
    });
  }




  render () {
    return (
      <div className="whole-double-calendar-container">
        <Headers />
        <div className="double-calendar-container">
          <Calendar
            view={this.state.view}
            clicked={{checkIn:this.state.checkIn, checkOut:this.state.checkOut, closest:this.state.closest}}
            change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut, closest:this.changeClosest, month:this.changeMonth}}
            date={this.state.left}
            side={'left'}
          />
          <Calendar
            view={this.state.view}
            clicked={{checkIn:this.state.checkIn, checkOut:this.state.checkOut, closest:this.state.closest}}
            change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut, closest:this.changeClosest, month:this.changeMonth}}
            date={this.state.right}
            side={'right'}
          />
        </div>

        <Footer
          change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
        />
      </div>
    );
  }
}

export default DoubleCalendarApp;