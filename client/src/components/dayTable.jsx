import React from 'react';
import DayRow from './dayRow.jsx';
import axios from 'axios';


class DayTable extends React.Component {
  constructor (props) {
    super(props);

    // variables
    // the date today
    this.currentDay = new Date();
    // first day of the month
    this.firstDay = new Date(this.props.year, this.props.month).getDay();
    // total number of days in month
    this.total = new Date(this.props.year, this.props.month+1, 0).getDate();

    // bind
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


  getDaysInMonth (month, year) {
    // returns the numbers of days in a given month
    return new Date(year, month+1, 0).getDate();
  }




  handleClick(day){
    console.log('clicked', day);
    if (this.props.view === 'base') {
      this.props.change.checkIn(new Date(this.props.year, this.props.month,day));
      this.props.change.view('start');
    } else if (this.props.view === 'start'){
      this.props.change.checkOut(new Date(this.props.year, this.props.month,day));
      this.props.change.view('end');
    }
    // else if (this.props.view === 'end'){
    //   this.setState({
    //     checkOut: day
    //   });
    // }

  }





  render() {
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
                reservedDates={this.props.reservedDates}
                handleClick = {this.handleClick}
                clicked = {this.props.clicked}
                view = {this.props.view}
                closest={this.props.closest}
              />)}
          </tbody>
        </table>
      );
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






  // getClosestReserved () {
  //   if (!this.state.closest) {
  //     if (this.props.month === this.clicked.checkIn.getMonth() && this.props.year === this.clicked.checkIn.getFullYear()) {
  //       // if in same month as check in day
  //       for (let day of this.state.reserved.slice().sort((a, b) => {return a - b;})) {
  //         if (day > this.checkIn.getDate()) {
  //           this.state.closestReserved = new Date(this.props.year, this.props.month, day);
  //           return;
  //         }
  //       }
  //     } else {
  //       if (this.state.reserved.length !== 0) {
  //         this.state.closestReserved = new Date(this.props.year, this.props.month, this.state.reserved.slice().sort((a, b) => {return a - b;})[0]);
  //       }
  //     }
  //   }
  // }