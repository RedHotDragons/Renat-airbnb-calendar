import React from 'react';
import axios from 'axios';

var DayRow = ({info, total, current, month, year, responses}) => {

  var createWeek = () => {
    // create an array which contains objects describing the day number and
    // css style for each day in the week. If it is the first week, add no
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
          week.push({day:""});
        } else {
          week.push({day:day});
          day++;
        }
      }
    } else {
      for (let i =0; i<7; i++) {
        if (day <= total) {
          week.push({day:day});
          day++;
        } else {
          week.push({day:""});
        }
      }
    }
    return week;
  }

  var getDaysInMonth = (month, year) => {
    // returns the numbers of days in a given month
    return new Date(year, month+1, 0).getDate();
  }

  var formatResponse = () => {
    var reserved = [];


    for (let response of responses) {
      var begin = response.startDay;
      var end = response.endDay;
      if (response.startMonth !== month) {
        // if reservation started in previous month and ends in this month
        begin = 1;
      }
      if (response.endMonth !== month) {
        // if reservation ends in next month
        end = getDaysInMonth(response.startMonth, response.startYear);
      }
      for (let i = begin; i <= end; i++) {
        reserved.push(i);
      }

    }
    return reserved;
  }

  var getReservedDates = () => {
    // return an array with all the day numbers for the given month that
    // cannot be booked (reserved or are in the past)
    var reserved = formatResponse();
    if (current) {
      var today = new Date;
      var today = today.getDate();
      for (let i = 1; i<today; i++) {
        reserved.push(i);
      }
    }
    return reserved;
  }

  var styleWeek = () => {
    // given the week (from createWeek()) and a list of all the days that are reserved
    // from (getReservedDates()), give each day the appropriate style and then return
    // an array with all the day objects

    const styledWeek = []
    const week = createWeek();
    const disabledStyle = {
      color: 'rgb(177,177,177)',
      textDecoration: 'line-through'
    };
    const reserved = getReservedDates();

    for (let day of week) {
      if (reserved.includes(day.day)) {
        day.style = disabledStyle;
      } else {
        day.style = {};
      }
      styledWeek.push(day);
    }
    return styledWeek;
  }


  return (
    <tr>
      {styleWeek().map(day=><td style={day.style}>{day.day}</td>)}
    </tr>
  );
};

export default DayRow;