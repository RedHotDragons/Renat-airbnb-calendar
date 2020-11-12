import React from 'react';

var DayRow = ({info, total}) => {

  var day = info.day;
  var start = info.startOn;

  var arr = [];
  if (start != 0) {
    for (let i =0; i<7; i++) {
      if (i<start) {
        arr.push("");
      } else {
        arr.push(day);
        day++;
      }
    }
  } else {
    for (let i =0; i<7; i++) {
      if (day <= total) {
        arr.push(day);
        day++;
      } else {
        arr.push("");
      }
    }
  }



  return (
    <tr>
      {arr.map(day=><td scope="row">{day}</td>)}
    </tr>
  );
};

export default DayRow;

// count = 0 , 4, 11, 18, 25
// [
//   {day:1, startOn: 4}, 7 - 4 + 1
//   {day:4, startOn: 0} 7 + 4
//   {day:11, startOn: 0} 7 + 11
//   {day:18, startOn: 0} 7 + 18
//   {day:25, startOn: 0} 25 + 7 =32
// ]