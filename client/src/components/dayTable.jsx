import React from 'react';
import DayRow from './dayRow.jsx';
import axios from 'axios';


class DayTable extends React.Component {
  constructor (props) {
    super(props);
    this.currentDay = new Date();
    this.state = {
      got: false,
      reservedDates: []
    };
    this.getReservedDates = this.getReservedDates.bind(this);
  }

  makeRows() {
    // return an array of objects that contain all the
    // information necessary for DayRow to be able to create
    // the correct row (week) in the calendar
    var rowInfo = [ {day: 1, startOn: this.props.start} ];
    var count = 8 - this.props.start;
    while (count <= this.props.total) {
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
        this.setState({
          got: true,
          reservedDates: response.data
        });
      })
      .catch(err => console.log('error getting', err));
  }

  render() {
    if (this.state.got){
      this.state.got = false;
      return(
        <table className="day-table">
          <tbody>
            {this.makeRows().map(info =>
              <DayRow
                key={info.day.toString()}
                info={info}
                total={this.props.total}
                current={this.props.current}
                month={this.props.month}
                year={this.props.year}
                responses={this.state.reservedDates}
              />)}
          </tbody>
        </table>
      );
    } else {
      this.getReservedDates();
      return (<div>Loading...</div>);
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