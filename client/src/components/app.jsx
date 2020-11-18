import React from 'react';

import Headers from '../components/headers.jsx';
import Calendar from '../components/calendar.jsx';
import Footer from '../components/footer.jsx';
import BookingForm from './sidebar/bookingForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'base',
      checkIn: new Date(0,0,0),
      checkOut: new Date(0,0,0),
      closest: null
    };

    this.changeView = this.changeView.bind(this);
    this.changeCheckIn = this.changeCheckIn.bind(this);
    this.changeCheckOut = this.changeCheckOut.bind(this);
    this.changeClosest = this.changeClosest.bind(this);
  }
  // possible views:
  // base, start(check in day selected), end (check out day selected)
  changeView(view) {
    if (view === 'base') {
      this.setState({
        view: view,
        closest: null
      });
    } else {
      this.setState({
        view: view
      });
    }
  }

  changeCheckIn(date, closest) {
    this.setState({
      checkIn: date,
      closest: closest
    });
  }

  changeCheckOut(date) {
    this.setState({
      checkOut: date
    });
  }

  changeClosest(date) {
    console.log('changing', date);
    this.setState({
      closest: date
    })
    console.log('new state', this.state.closest);
  }

  render () {
    return (
      <div>
        <Headers
          view={this.state.view}
          checkIn={this.state.checkIn}
          checkOut={this.state.checkOut}
        />
        <Calendar
          view={this.state.view}
          clicked={{checkIn:this.state.checkIn, checkOut:this.state.checkOut, closest:this.state.closest}}
          change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut, closest:this.changeClosest}}
          closest={this.state.closest}
        />
        <Footer
          change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
        />
        <BookingForm />
      </div>
    );
  }
}

export default App;

// if (this.state.view === 'start') {
//   return (
//     <div>
//       <Headers
//         view={this.state.view}
//         checkIn={this.state.checkIn}
//         checkOut={this.state.checkOut}
//       />
//       <StartCalendar
//         view={this.state.view}
//         clicked={{checkIn:this.state.checkIn, checkOut:this.state.checkOut}}
//         change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
//         closest={this.state.closest}
//       />
//       <Footer
//         change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
//       />
//    </div>
//   );
// } else {