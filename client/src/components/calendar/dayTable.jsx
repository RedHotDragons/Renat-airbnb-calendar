import React from 'react';
import DayRow from './dayRow.jsx';
import axios from 'axios';

class DayTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      month : []
    };

    // variables
    this.currentDay = new Date(); // the date today
    this.firstDay = new Date(this.props.year, this.props.month).getDay(); // first day of the month
    this.total = new Date(this.props.year, this.props.month+1, 0).getDate(); // total days in month

    this.checkIn = this.props.clicked.checkIn;
    this.checkOut = this.props.clicked.checkOut;

    // bind
    this.handleClick = this.handleClick.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.createFinalMonth = this.createFinalMonth.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);


    // styles
    this.disabledStyle = {
      color: 'rgb(177,177,177)',
      textDecoration: 'line-through',
      fontWeight: '400px'
    };
    this.clickedStyle = {
      border: '1px solid black',
      borderRadius: '100%',
      color: 'white',
      backgroundColor: 'rgb(34,34,34)',
    };
    this.hoverStyle = {
      border: '1px solid rgb(34,34,34)',
      borderRadius: '100%',
    }
    this.highlightStyle = {
      backgroundColor: 'rgb(240,240,240)'
    }

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

  createWeek (rowInfo) {
    // create an array which contains objects describing the day number and
    // css style for each day in the week. If it is the first week, add no
    // text for days that are not part of this month. If it is
    // the last week, add no text for days that are not part of this
    // calendar month
    var day = rowInfo.day;
    var start = rowInfo.startOn;

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
        if (day <= this.total) {
          week.push({day:day, month:this.props.month, year:this.props.year});
          day++;
        } else {
          week.push({day:"", month:this.props.month, year:this.props.year});
        }
      }
    }
    return week;
  }

  createMonth(rowInfo) {
    // return an array composed of arrays. Each inner array is a week.
    // each week contains 7 objects describing the day, month, year.
    var month = [];
    var week = [];
    for (let row of rowInfo) {
      week = this.createWeek(row);
      month.push(week)
    }
    return month;
  }


  styleWeek(week) {
    // given the week (from createWeek()) and a list of all the days that are reserved
    // (from props), give each day the appropriate style and then return
    // an array with all the day objects
    var styledWeek = []
    const reserved = this.props.reservedDates;
    if (this.props.view === 'base') {
      styledWeek = this.styleWeekBase(week, reserved);
    } else if (this.props.view === 'start') {
      styledWeek =this.styleWeekStart(week, reserved);
    } else if (this.props.view === 'end') {
      styledWeek =this.styleWeekEnd(week, reserved);
    }

    return styledWeek;
  }

  styleMonth(month){
    // given month from createMonth(), style it.
    var styledMonth = [];
    var styledWeek;
    for (let week of month) {
      styledWeek = this.styleWeek(week);
      styledMonth.push(styledWeek);
    }
    return styledMonth;
  }


  styleWeekBase(week, reserved) {
    const styledWeek = [];

    for (let day of week) {
      if (reserved.includes(day.day)) {
        day.style = this.disabledStyle;
        day.className = "unavailable";
      } else {
        if (day.day === "") {
          day.style = {};
          day.className = "blank";
        } else {
          day.style = {};
          day.className = "available";
        }
      }
      styledWeek.push(day);
    }
    return styledWeek;
  }

  styleWeekStart(week, reserved) {
    const styledWeek = [];
    for (let day of week) {
      var date = new Date(day.year, day.month, day.day);

      if (this.props.closest && date >= this.props.closest) {
        day.style = this.disabledStyle;
        day.className = "unavailable";

      } else if (this.datesAreEqual(day,this.checkIn)) {
        day.style = this.clickedStyle;
        day.className = "check-in";

      } else if(reserved.includes(day.day) || date < this.checkIn) {
        day.style = this.disabledStyle;
        day.className = "unavailable";
      } else {
        if (day.day === "") {
          day.style = {};
          day.className = "blank";
        } else {
          day.style = {};
          day.className = "available";
        }
      }
      styledWeek.push(day);
    }
    return styledWeek;
  }

  dateInBetween(obj, date1, date2) {
    let day = new Date(obj.year, obj.month, obj.day);
    if (day > date1 && day < date2) {
      return true;
    }
    return false;
  }

  styleWeekEnd(week, reserved) {
    const styledWeek = [];

    for (let day of week) {
      if (reserved.includes(day.day)) {
        day.style = this.disabledStyle;
        day.className = "unavailable";
      } else if (day.day === "") {
        day.style = {};
        day.className = "blank";
      } else if (this.datesAreEqual(day,this.checkIn)) {
        day.style = this.clickedStyle;
        day.className = "check-in";
      } else if (this.datesAreEqual(day,this.checkOut)) {
        day.style = this.clickedStyle;
        day.className = "check-out";
      } else if (this.dateInBetween(day, this.checkIn, this.checkOut)){
        day.style = this.highlightStyle;
        day.className = "inbetween";
      } else {
        day.style = {};
        day.className = "available";
      }
      styledWeek.push(day);
    }
    return styledWeek;
  }


  createFinalMonth(){
    var rowInfo = this.makeRows();
    var unstyledMonth = this.createMonth(rowInfo);
    var styledMonth = this.styleMonth(unstyledMonth);
    this.setState({
      month: styledMonth
    });
  }

  datesAreEqual(obj, date) {
    return obj.month  === date.getMonth() && obj.year===date.getFullYear() && obj.day === date.getDate()
  }

  updateStyle (clickedDay, style){
    let args = [...arguments]
    args = args.slice(1);
    style = Object.assign({}, ...args);
    for (let week of this.state.month) {
      for (let day of week) {
        if (day.day === clickedDay) {
          day.style = style
          break;
        }
      }
    }
    this.setState({
      month: this.state.month
    });
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

  startHandleEnter(current) {
    for (let week of this.state.month) {
      for (let dayObj of week) {
        if (dayObj.className === 'available') {

          if (dayObj.day === current) {
            this.updateStyle(dayObj.day, this.hoverStyle, this.highlightStyle);
          }
          else if (new Date(dayObj.year, dayObj.month, dayObj.day) > this.checkIn.getDate()){
            if (dayObj.day < current) {
              this.updateStyle(dayObj.day, this.highlightStyle);
            } else{
              this.updateStyle(dayObj.day, {});
            }
          }
        }

      }
    }
  }


  handleEnter (day) {
    if (this.props.view === 'start') {
      // for (let i = this.checkIn.getDate() + 1; i<=day; i++ ) {
      //   this.updateStyle(i, this.highlightStyle);
      // }
      this.startHandleEnter(day);
    } else {
      this.updateStyle(day, this.hoverStyle);
    }
  }

  handleExit (day) {
    this.updateStyle(day, {});
  }



  render() {
    if (this.state.month.length === 0) {
      this.createFinalMonth();
    }
      return(
        <table className="day-table">
          <tbody>
            {this.state.month.map(week =>
              <DayRow
                key={week[0].day.toString()}
                week={week}
                handlers={{click: this.handleClick, enter: this.handleEnter, exit:this.handleExit}}
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
