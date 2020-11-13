import React from 'react';
import DayRow from './dayRow.jsx';

var DayTable = ({start, total}) => {

  // var getRows = () => {
  //   // calculate how many rows the table should have
  //   return Math.ceil((total - (7-start)) / 7) + 1
  // }

  var makeRows = () => {
    // return an array of objects that contain all the
    // information necessary for DayRow to be able to create
    // the correct row (week) in the calendar
    var rowInfo = [ {day: 1, startOn: start} ];
    var count = 8 - start;
    while (count <= total) {
      rowInfo.push(
        {day: count, startOn: 0}
      );
      count = count + 7;
    }
    return rowInfo;
  }

  return(
    <table className="day-table">
      <tbody>
        {makeRows().map(info=><DayRow info={info} total={total}/>)}
      </tbody>
    </table>
  );
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