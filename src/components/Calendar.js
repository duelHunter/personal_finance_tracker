import React, { useState } from 'react';
import './calendar.css';

const Calendar = () => {

  ///////////////////////////////////////////////////////
  let dailyIncome;
  let dailyExpense;
  
  const daily_In_Ex = (whichDay) => {
    dailyIncome = 0;
    dailyExpense = 0;
  
    let days = Object.keys(localStorage);
  
    days.forEach((dayKey) => { 
      const obj = JSON.parse(localStorage.getItem(dayKey));
      const day = new Date(dayKey);
  
      if (
        whichDay.getFullYear() === day.getFullYear() &&
        whichDay.getMonth() === day.getMonth() &&
        whichDay.getDate() === day.getDate()
      ) {
        if (obj.transType === "Income") {
          dailyIncome += parseFloat(Number(obj.amount.replace(/,/g,"")).toFixed(2));
        }
        else if(obj.transType === "Expense"){
          dailyExpense += parseFloat(Number(obj.amount.replace(/,/g,"")).toFixed(2));
        }
       
      }
    });
  };
  

  //////////////////////////////////////////////////////create calender dates
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const buildCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDate = new Date(firstDayOfMonth);

    startDate.setDate(startDate.getDay()-7); // Start from the previous Sunday

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(lastDayOfMonth.getDate() - endDate.getDay()); // End on the next Saturday

    const calendarRows = [];
  
    while (startDate <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        daily_In_Ex(startDate);
        week.push(
          <td key={startDate.toDateString()} className={startDate.toDateString() === currentDate.toDateString() ? 'today' : ''}>
            {startDate.getDate()}
            <p>Income {dailyIncome}</p>
            <p>Expense {dailyExpense}</p>
          </td>
        );
        startDate.setDate(startDate.getDate() + 1);
      }
      calendarRows.push(<tr key={startDate.toDateString()}>{week}</tr>);
    }

    return calendarRows;
  };

  return (
    <div className='calendar-back'>
      <table>
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{buildCalendar(currentDate.getFullYear(), currentDate.getMonth())}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
