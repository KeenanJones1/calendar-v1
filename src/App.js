import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components'
const { datesGenerator } = require('dates-generator');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']

const Container = styled.div`
  width: 350px;
  border: 1px solid black;
  margin: 0 auto;
  box-shadow: 10px 10px 0px black;
`

const MonthText = styled.div`
  font-size: 26px;
  font-weight: bold; 
  text-align: center;
`



const App = () => {
  // selectedDate is the date that we selected in the calendar. By default the date is present date.
  const [selectedDate, setSelectedDate] = useState(new Date());

  // dates is the state that will hold all the dates for the given month.
  const [dates, setDates] = useState([]);

  // calendar is the state that will hold the month and year for the calendar.
  const [calendar, setCalendar] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear()})


// Next and Previous Month functionality begin datesGenerator package has next and previous ===============================
  // to go to next month calendar
  const onClickNext = () => {
    const body = { month: calendar.nextMonth, year: calendar.nextYear};
    const {dates, nextMonth, nextYear, previousMonth, previousYear} = datesGenerator(body)
    setDates([...dates]);
    setCalendar({
      ...calendar, 
      month: calendar.nextMonth,
      year: calendar.nextYear, 
      nextMonth,
      nextYear,
      previousMonth,
      previousYear
    })
  }

//  to go to previous month calendar
  const onClickPrevious = () => {
    const body = { month: calendar.previousMonth, year: calendar.previousYear};
    const {dates, nextMonth, nextYear, previousMonth, previousYear} = datesGenerator(body);
    setDates([...dates]);
    setCalendar({
      ...calendar,
      month: calendar.previousMonth,
      year: calendar.previousYear,
      nextMonth, 
      nextYear,
      previousMonth, 
      previousYear
    });
  }
// Next and Previous Month functionality end =====================================

  const onSelectedDate = (date) => {
    setSelectedDate(new Date(date.year, date.month, date.date))
  }

  // fill up the calendar with the dates, by default the calendar will be the present month calendar.
  useEffect(() => {
    // the month and year by passing the body inside the datesGenerator function will return the all the dates that is available for the given month.
    const body = {
      month: calendar.month,
      year: calendar.year
    };
// the datesGenerator function, will return all the dates that is available for the given month.
    const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);
    setDates([ ...dates ]);
    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear
    });
  }, [])

    return (
      <div style={{width:'100%', paddingTop: 50 }}>
        <Container>
          <div className="" style={{float: 'left', width: '50%' }} onClick={() => onClickPrevious()}>
            Previous
          </div>
          <div className="" style={{float: 'right', width: '50%', textAlign: 'right'}} onClick={() => onClickNext()}>
            Next
          </div>
          <MonthText>
            {months[calendar.month]}
          </MonthText>
          <div className="">

            <div className="">
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    {days.map((day) => (
                      <td key={day} style={{padding: '5px 0'}}>
                        <div className="" style={{textAlign: 'center', padding: '5px 0'}}>{day}</div>
                      </td>
                    ))}
                  </tr>

                  {months.length > 0 && dates.map((week) => (
                    <tr key={JSON.stringify(week[0])}>
                      {week.map((each) => (
                        <td key={JSON.stringify(each)} style={{ padding: '5px 0'}}>
                          <div className="" style={{textAlign: 'center', padding: '5px 0'}} onClick={() => onSelectedDate(each)}>
                            {/* Work on this */}
                            {each.date}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="">
            Selected Date: {selectedDate.toDateString()}
          </div>
        </Container>
      </div>
    )
  }

export default App
