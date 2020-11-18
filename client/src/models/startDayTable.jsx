import React from 'react';
import DayRow from '../components/dayRow.jsx';
import axios from 'axios';


class StartDayTable extends React.Component {
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
        if (day <= this.props.total) {
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
        day.style = {};
        day.className = "available";
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
        day.style = {};
        day.className = "available";
      }
      styledWeek.push(day);
    }
    return styledWeek;
  }


  styleWeekEnd(week, reserved) {
    const styledWeek = [];

    for (let day of week) {
      if (reserved.includes(day.day)) {
        day.style = this.disabledStyle;
        day.className = "unavailable";
      } else if (this.datesAreEqual(day,this.checkIn)) {
        day.style = this.clickedStyle;
        day.className = "check-in";
      } else if (this.datesAreEqual(day,this.checkOut)) {
        day.style = this.clickedStyle;
        day.className = "check-out";
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
    console.log(styledMonth);
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
    this.createMonth();
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


export default StartDayTable;

// example output from makeRows()
// [
//   {day:1, startOn: 4}, (day 4 is Thursday, everyday before thursday on
//                         the first row will be blank)
//   {day:4, startOn: 0},
//   {day:11, startOn: 0},
//   {day:18, startOn: 0},
//   {day:25, startOn: 0}
// ]




// OLD
// class DayTable extends React.Component {
//   constructor (props) {
//     super(props);

//     // variables
//     // the date today
//     this.currentDay = new Date();
//     // first day of the month
//     this.firstDay = new Date(this.props.year, this.props.month).getDay();
//     // total number of days in month
//     this.total = new Date(this.props.year, this.props.month+1, 0).getDate();

//     // bind
//     this.handleClick = this.handleClick.bind(this);
//   }

//   componentDidUpdate() {
//     this.firstDay = new Date(this.props.year, this.props.month).getDay();
//     this.total = new Date(this.props.year, this.props.month+1, 0).getDate();
//   }



//   makeRows() {
//     // return an array of objects that contain all the
//     // information necessary for DayRow to be able to create
//     // the correct row (week) in the calendar
//     var rowInfo = [ {day: 1, startOn: this.firstDay} ];
//     var count = 8 - this.firstDay;
//     while (count <= this.total) {
//       rowInfo.push(
//         {day: count, startOn: 0}
//       );
//       count = count + 7;
//     }
//     return rowInfo;
//   }


//   getDaysInMonth (month, year) {
//     // returns the numbers of days in a given month
//     return new Date(year, month+1, 0).getDate();
//   }




//   handleClick(day){
//     console.log('clicked', day);
//     if (this.props.view === 'base') {
//       this.props.change.checkIn(new Date(this.props.year, this.props.month,day));
//       this.props.change.view('start');
//     } else if (this.props.view === 'start'){
//       this.props.change.checkOut(new Date(this.props.year, this.props.month,day));
//       this.props.change.view('end');
//     }
//     // else if (this.props.view === 'end'){
//     //   this.setState({
//     //     checkOut: day
//     //   });
//     // }

//   }




//   render() {
//       return(
//         <table className="day-table">
//           <tbody>
//             {this.makeRows().map(info =>
//               <DayRow
//                 key={info.day.toString()}
//                 info={info}
//                 total={this.total}
//                 current={this.props.current}
//                 month={this.props.month}
//                 year={this.props.year}
//                 reservedDates={this.props.reservedDates}
//                 handleClick = {this.handleClick}
//                 clicked = {this.props.clicked}
//                 view = {this.props.view}
//                 closest={this.props.closest}
//               />)}
//           </tbody>
//         </table>
//       );
//   }
// }


// export default DayTable;





// OLD ROWS
// class DayRow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reserved: this.props.reservedDates,
//       styledWeek: null,
//     };

//     // styles
//     this.disabledStyle = {
//       color: 'rgb(177,177,177)',
//       textDecoration: 'line-through',
//       fontWeight: '400px'
//     };
//     this.clickedStyle = {
//       border: '1px solid black',
//       borderRadius: '100%',
//       color: 'white',
//       backgroundColor: 'rgb(34,34,34)',
//     };
//     this.hoverStyle = {
//       border: '1px solid rgb(34,34,34)',
//       borderRadius: '100%',
//     }
//     this.highlightStyle = {
//       backgroundColor: 'lightgrey'
//     }

//     // initialize variables from props
//     this.checkIn = this.props.clicked.checkIn;
//     this.checkOut = this.props.clicked.checkOut;

//     // bind
//     this.styleWeek = this.styleWeek.bind(this);
//     this.updateStyle = this.updateStyle.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.handleEnter = this.handleEnter.bind(this);
//     this.handleExit = this.handleExit.bind(this);
//   }

//   componentDidUpdate() {
//     this.checkIn = this.props.clicked.checkIn;
//     this.checkOut = this.props.clicked.checkOut;
//     this.styleWeek();
//   }

//   createWeek () {
//     // create an array which contains objects describing the day number and
//     // css style for each day in the week. If it is the first week, add no
//     // text for days that are not part of this month. If it is
//     // the last week, add no text for days that are not part of this
//     // calendar month
//     var day = this.props.info.day;
//     var start = this.props.info.startOn;

//     var week = [];
//     if (start != 0) {
//       // special case for first week
//       for (let i =0; i<7; i++) {
//         if (i<start) {
//           week.push({day:"", month:this.props.month, year:this.props.year});
//         } else {
//           week.push({day:day, month:this.props.month, year:this.props.year});
//           day++;
//         }
//       }
//     } else {
//       for (let i =0; i<7; i++) {
//         if (day <= this.props.total) {
//           week.push({day:day, month:this.props.month, year:this.props.year});
//           day++;
//         } else {
//           week.push({day:"", month:this.props.month, year:this.props.year});
//         }
//       }
//     }
//     return week;
//   }

//   datesAreEqual(obj, date) {
//     return obj.month  === date.getMonth() && obj.year===date.getFullYear() && obj.day === date.getDate()
//   }


//   styleWeekStart(week, reserved) {
//     const styledWeek = [];
//     for (let day of week) {
//       var date = new Date(day.year, day.month, day.day);

//       if (this.props.closest && date >= this.props.closest) {
//         day.style = this.disabledStyle;
//         day.className = "unavailable";

//       } else if (this.datesAreEqual(day,this.checkIn)) {
//         day.style = this.clickedStyle;
//         day.className = "check-in";

//       } else if(reserved.includes(day.day) || date < this.checkIn) {
//         day.style = this.disabledStyle;
//         day.className = "unavailable";
//       } else {
//         day.style = {};
//         day.className = "available";
//       }
//       styledWeek.push(day);
//     }
//     return styledWeek;
//   }

//   styleWeekBase(week, reserved) {
//     const styledWeek = [];

//     for (let day of week) {
//       if (reserved.includes(day.day)) {
//         day.style = this.disabledStyle;
//         day.className = "unavailable";
//       } else {
//         day.style = {};
//         day.className = "available";
//       }
//       styledWeek.push(day);
//     }
//     return styledWeek;
//   }

//   styleWeekEnd(week, reserved) {
//     const styledWeek = [];

//     for (let day of week) {
//       if (reserved.includes(day.day)) {
//         day.style = this.disabledStyle;
//         day.className = "unavailable";
//       } else if (this.datesAreEqual(day,this.checkIn)) {
//         day.style = this.clickedStyle;
//         day.className = "check-in";
//       } else if (this.datesAreEqual(day,this.checkOut)) {
//         day.style = this.clickedStyle;
//         day.className = "check-out";
//       } else {
//         day.style = {};
//         day.className = "available";
//       }
//       styledWeek.push(day);
//     }
//     return styledWeek;
//   }

//   styleWeek() {
//     // given the week (from createWeek()) and a list of all the days that are reserved
//     // (from props), give each day the appropriate style and then return
//     // an array with all the day objects
//     var styledWeek = []
//     const week = this.createWeek();
//     const reserved = this.state.reserved;
//     if (this.props.view === 'base') {
//       styledWeek = this.styleWeekBase(week, reserved);
//     } else if (this.props.view === 'start') {
//       styledWeek =this.styleWeekStart(week, reserved);
//     } else if (this.props.view === 'end') {
//       styledWeek =this.styleWeekEnd(week, reserved);
//     }

//     this.state.styledWeek = styledWeek;
//   }


//   updateStyle (clickedDay, style){
//     for (let day of this.state.styledWeek) {
//       if (day.day === clickedDay) {
//         day.style = style
//         break;
//       }
//     }
//     this.setState({
//       styledWeek: this.state.styledWeek
//     });

//   }

//   handleClick (e) {
//     e.preventDefault();
//     if (e.target.classList.contains('available')) {
//       if (this.checkIn.toString() === new Date(0,0,0).toString()) {
//         this.props.handleClick(Number(e.target.innerHTML));
//       } else if (this.checkOut.toString() === new Date(0,0,0).toString()){
//         this.props.handleClick(Number(e.target.innerHTML));
//       }

//     }
//   }

//   handleEnter (e) {
//     e.preventDefault();
//     if (e.target.classList.contains('available')) {
//       if (this.props.view === 'start') {
//         for (let i = this.checkIn.getDate() + 1; i<=Number(e.target.innerHTML); i++ ) {
//           this.updateStyle(i, this.highlightStyle);
//         }
//       } else {
//         this.updateStyle(Number(e.target.innerHTML), this.hoverStyle);
//       }
//     }
//   }

//   handleExit (e) {
//     e.preventDefault();
//     if (e.target.classList.contains('available')) {
//       this.updateStyle(Number(e.target.innerHTML), {});
//     }
//   }

//   render() {
//     if (!this.state.styledWeek) {
//       this.styleWeek();
//     }
//     return (
//       <tr>
//         {this.state.styledWeek.map(day =>
//           <td
//             className={day.className}
//             onMouseOver={this.handleEnter}
//             onMouseLeave={this.handleExit}
//             onClick={this.handleClick}
//             style={day.style}
//           >
//             {day.day}
//           </td>)}
//       </tr>
//     );
//   }
// }

// export default DayRow;