import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// global test variables
const views = {base:'base', start: 'start', end: 'end'};
var checkIn = new Date(0,0,0);
var checkOut = new Date(0,0,0);
var closest = null;
var clicked = {checkIn:checkIn, checkOut:checkOut, closest:closest}
const month = 10;
const year = 2020;
const reserved = [8,9,10,11,12,13,14,15];

import Headers from '../src/components/calendar/headers.jsx';
describe('Calendar Headers Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<Headers
      view={views.base}
      checkIn={checkIn}
      checkOut={checkOut}
    />);

    expect(wrapper.exists()).toBe(true);
  });
});

import Calendar from '../src/components/calendar/calendar.jsx';
describe('Calendar Calendar Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<Calendar
      view={views.base}
      clicked={clicked}/>);

    expect(wrapper.exists()).toBe(true);
  });
});



import TitleBar from '../src/components/calendar/calTitleBar.jsx';
describe('Calendar Titlebar Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<TitleBar
      month={month}
      year={year}
    />);

    expect(wrapper.exists()).toBe(true);
  });
});


import DayTable from '../src/components/calendar/dayTable.jsx';
describe('Calendar Table Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<DayTable
      month={month}
      year={year}
      current={new Date()}
      view={views.base}
      clicked={clicked}
      reservedDates={reserved}
      closest={closest}
    />);

    expect(wrapper.exists()).toBe(true);
  });
});


import DayRow from '../src/components/calendar/dayRow.jsx';
describe('Calendar Rows Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<DayRow
      week={[{day:1, month:10, year:2020, style:{}},{day:2, month:10, year:2020, style:{}}]}
    />);

    expect(wrapper.exists()).toBe(true);
  });
});



import Footer from '../src/components/calendar/footer.jsx';
describe('Calendar Footer Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<Footer />);

    expect(wrapper.exists()).toBe(true);
  });
});