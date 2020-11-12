import React from 'react';
import DayRow from './dayRow.jsx';

var DayTable = ({start, total}) => {

  var getRows = () => {
    // calculate how many rows the table should have
    return Math.ceil((total - (7-start)) / 7) + 1
  }

  var makeRows = () => {
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

  console.log(getRows(), makeRows());


  return(
    <table className="day-table">
      <tbody>
        {makeRows(getRows()).map(info=><DayRow info={info} total={total}/>)}
      </tbody>
    </table>
  );
}

export default DayTable;

// count = 0 , 4, 11, 18, 25
// [
//   {day:1, startOn: 4}, 7 - 4 + 1
//   {day:4, startOn: 0} 7 + 4
//   {day:11, startOn: 0} 7 + 11
//   {day:18, startOn: 0} 7 + 18
//   {day:25, startOn: 0} 25 + 7 =32
// ]