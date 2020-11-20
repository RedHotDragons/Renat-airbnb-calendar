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

  it ('displays correct base view headers', () => {
    const wrapper = Enzyme.shallow(<Headers
      view={views.base}
      checkIn={checkIn}
      checkOut={checkOut}
    />);

    expect(wrapper.find('.main-header').text()).toBe('Select check-in date');
    expect(wrapper.find('.mini-header').text()).toBe('Add travel dates for exact pricing');
  });

  it ('displays correct start view header', () => {
    const wrapper = Enzyme.shallow(<Headers
      view={views.start}
      checkIn={checkIn}
      checkOut={checkOut}
    />);

    expect(wrapper.find('.main-header').text()).toBe('Select check-out date');
    expect(wrapper.find('.mini-header').text()).toBe('Minimum stay: 14 nights');
  });

  it ('displays correct start view header', () => {
    const wrapper = Enzyme.shallow(<Headers
      view={views.end}
      checkIn={new Date(2020, 10, 5)}
      checkOut={new Date(2020, 10, 7)}
    />);

    expect(wrapper.find('.main-header').text()).toBe('2 nights in Cottonwood');
    expect(wrapper.find('.mini-header').text()).toBe('Nov 5, 2020 - Nov 7, 2020');
  });



});

import Calendar from '../src/components/calendar/calendar.jsx';
describe('Calendar Calendar Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<Calendar
      view={views.base}
      clicked={clicked}
    />);

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

  it ('changes month forward', ()=> {
    const clickFn = jest.fn();
    const wrapper = Enzyme.shallow(<TitleBar
      month={month}
      year={year}
      changeMonth={clickFn}
    />);

    wrapper
      .find('#forward')
      .simulate('click', {preventDefault:()=>{}});

    expect(clickFn).toHaveBeenCalled();
  });


  it ('changes month backward', ()=> {
    const clickFn = jest.fn();
    const wrapper = Enzyme.shallow(<TitleBar
      month={month}
      year={year}
      changeMonth={clickFn}
    />);

    wrapper
      .find('#back')
      .simulate('click', {preventDefault:()=>{}});

    expect(clickFn).toHaveBeenCalled();
  });

  it ('back button disabled on current month', ()=> {
    const clickFn = jest.fn();
    const wrapper = Enzyme.shallow(<TitleBar
      month={month}
      year={year}
      changeMonth={clickFn}
    />);
    expect(wrapper.state('disabled')).toBe(true);
    wrapper
      .find('#back')
      .simulate('click', {preventDefault:()=>{}});

    expect(clickFn).toHaveBeenCalled();
    expect(wrapper.state('disabled')).toBe(true);
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

  it ('creates a styled Month', () => {
    const wrapper = Enzyme.shallow(<DayTable
      month={month}
      year={year}
      current={new Date()}
      view={views.base}
      clicked={clicked}
      reservedDates={reserved}
      closest={closest}
    />);

    wrapper.instance().createFinalMonth();
    expect(wrapper.state('month').length).toBe(5);
    expect(wrapper.state('month')[0].length).toBe(7);
    expect(wrapper.state('month')[0][0].day).toBe(1);
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

  it('creates a row', () => {
    const wrapper = Enzyme.shallow(<DayRow
      week={[{day:1, month:10, year:2020, style:{}},{day:2, month:10, year:2020, style:{}},{day:3, month:10, year:2020, style:{}}]}
    />);

    expect(wrapper.find('tr').text()).toBe('123');
  });
});



import Footer from '../src/components/calendar/footer.jsx';
describe('Calendar Footer Component', () => {
  it('renders', () => {
    const wrapper = Enzyme.shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('clicks clear', () => {
    const clickFn = jest.fn();
    const wrapper = Enzyme.shallow(<Footer
      change={{view:clickFn, checkIn:clickFn, checkOut:clickFn}}
    />);
    wrapper.find('.clear-button').simulate('click', {preventDefault:()=>{}});
    expect(clickFn).toHaveBeenCalled();
  });
});