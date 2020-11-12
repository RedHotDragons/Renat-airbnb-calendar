import React from 'react';

var DayRow = ({info, total}) => {

  var createWeek = () => {
    // create an array which contains the day number for
    // each day in the week. If it is the first week, add no
    // text for days that are not part of this month. If it is
    // the last week, add no text for days that are not part of this
    // calendar month
    var day = info.day;
    var start = info.startOn;

    var week = [];
    if (start != 0) {
      // special case for first week
      for (let i =0; i<7; i++) {
        if (i<start) {
          week.push("");
        } else {
          week.push(day);
          day++;
        }
      }
    } else {
      for (let i =0; i<7; i++) {
        if (day <= total) {
          week.push(day);
          day++;
        } else {
          week.push("");
        }
      }
    }
    return week;
  }



  return (
    <tr>
      {createWeek().map(day=><td scope="row">{day}</td>)}
    </tr>
  );
};

export default DayRow;
