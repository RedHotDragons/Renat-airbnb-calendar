import React from 'react';
import DayRow from './dayRow.jsx';
import axios from 'axios';


class DayTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gotFromDb: false,
      reservedDates: [],
      checkIn: 0,
      checkOut: 0
    };

    // variables
    // the date today
    this.currentDay = new Date();
    // first day of the month
    this.firstDay = new Date(this.props.year, this.props.month).getDay();
    // total number of days in month
    this.total = new Date(this.props.year, this.props.month+1, 0).getDate();

    // bind
    this.getReservedDates = this.getReservedDates.bind(this);
    this.formatResponse = this.formatResponse.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    this.firstDay = new Date(this.props.year, this.props.month).getDay();
    this.total = new Date(this.props.year, this.props.month+1, 0).getDate();
  }



  makeRows() {
    // return an array of objects that contain all the
    // information necessary for DayRow to be able to create
    // the correct row (week) in the calendar
    var rowInfo = [ {day: 1, startOn: this.firstDay} ];
    var count = 8 - this.firstDay;
    while (count <= this.total) {
      rowInfo.push(
        {day: count, startOn: 0}
      );
      count = count + 7;
    }
    return rowInfo;
  }

  getReservedDates() {
    // upon recieving data from database, update state to reflect that we have
    // recieved the data for this month and stores the response in the state

    axios.get(`/reservations/${this.props.month}/${this.props.year}`)
      .then(response => {
        console.log('success');
        this.formatResponse(response.data);
      })
      .catch(err => console.log('error getting', err));
  }


  formatResponse (responses) {
    // given the response from the database, parse the values and store
    // all reserved dates as day numbers in an array
    var reserved = [];


    for (let response of responses) {
      var begin = response.startDay;
      var end = response.endDay;
      if (response.startMonth !== this.props.month) {
        // if reservation started in previous month and ends in this month
        begin = 1;
      }
      if (response.endMonth !== this.props.month) {
        // if reservation ends in next month
        end = this.getDaysInMonth(response.startMonth, response.startYear);
      }
      for (let i = begin; i <= end; i++) {
        reserved.push(i);
      }

    }

    if (this.props.current) {
      var today = new Date;
      var today = today.getDate();
      for (let i = 1; i<today; i++) {
        reserved.push(i);
      }
    }

    this.setState({
      gotFromDb: true,
      reservedDates: reserved
    });
  }

  getDaysInMonth (month, year) {
    // returns the numbers of days in a given month
    return new Date(year, month+1, 0).getDate();
  }


  handleClick(day){
    console.log('clicked', day);
    if (this.props.view === 'base') {
      this.props.change.view('start');
      this.props.change.checkIn(new Date(this.props.year, this.props.month,day));
    } else if (this.props.view === 'start'){
      this.props.change.view('end');
      this.props.change.checkOut(new Date(this.props.year, this.props.month,day));
    }
    // else if (this.props.view === 'end'){
    //   this.setState({
    //     checkOut: day
    //   });
    // }

  }




  render() {
    if (this.state.gotFromDb){
      this.state.gotFromDb = false;
      return(
        <table className="day-table">
          <tbody>
            {this.makeRows().map(info =>
              <DayRow
                key={info.day.toString()}
                info={info}
                total={this.total}
                current={this.props.current}
                month={this.props.month}
                year={this.props.year}
                reservedDates={this.state.reservedDates}
                handleClick = {this.handleClick}
                clicked = {this.props.clicked}
                view = {this.props.view}
              />)}
          </tbody>
        </table>
      );
    } else {
      this.getReservedDates();
      return (<div></div>);
    }
  }
}


export default DayTable;

// example output from makeRows()
// [
//   {day:1, startOn: 4}, (day 4 is Thursday, everyday before thursday on
//                         the first row will be blank)
//   {day:4, startOn: 0},
//   {day:11, startOn: 0},
//   {day:18, startOn: 0},
//   {day:25, startOn: 0}
// ]

// disable back on current
// var backButton = document.getElementById("back");
//   backButton.disabled = true;