import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

function Datepicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("time = ",selectedDate);
  };

  return (
    <div id="date-Picker-container">
      <DatePicker
        id='date-Picker'
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        showIcon
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="Time"
      />
    </div>
  );
}

export default Datepicker;
