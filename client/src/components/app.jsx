import React from 'react';

import Headers from '../components/headers.jsx';
import Calendar from '../components/calendar.jsx';
import Footer from '../components/footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'base',
      checkIn: new Date(0,0,0),
      checkOut: new Date(0,0,0)
    };

    this.changeView = this.changeView.bind(this);
    this.changeCheckIn = this.changeCheckIn.bind(this);
    this.changeCheckOut = this.changeCheckOut.bind(this);
  }
  // possible views:
  // base, start(check in day selected), end (check out day selected)
  changeView(view) {
    this.setState({
      view: view
    });
  }

  changeCheckIn(date) {
    this.setState({
      checkIn: date
    });
  }

  changeCheckOut(date) {
    this.setState({
      checkOut: date
    });
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
          clicked={{checkIn:this.state.checkIn, checkOut:this.state.checkOut}}
          change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
        />
        <Footer
          change={{view:this.changeView, checkIn:this.changeCheckIn, checkOut:this.changeCheckOut}}
        />
     </div>
    );
  }
}

export default App;