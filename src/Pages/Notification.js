import React, { useState } from 'react';
import './Notification.css';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ButtonToolbar } from 'react-bootstrap';


export default function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("time = ", date);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  ////////////////////////////////////////////////////////////////////// Get cookie value by name
  function getCookie(name) {
    var cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
     
  var userDataString = getCookie('userData');
  if (userDataString) {
    var userData = JSON.parse(userDataString);
    console.log("userdata is ", userData);
  } else {
    console.log('User account details not found in cookie.');
  }

//////////////////////////////////////////////////////////////////////////download csv
const downloadAllLocalStorageDataAsCSV = () => {
  const allData = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const data = localStorage.getItem(key);
    allData.push(JSON.parse(data));
  }

  const csv = convertArrayOfObjectsToCSV(allData);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'allLocalStorageData.csv');
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

function convertArrayOfObjectsToCSV(data) {
  const header = Object.keys(data[0]).join(',');
  const csv = data.map((row) => Object.values(row).join(','));
  return `${header}\n${csv.join('\n')}`;
}



  return (
    <div>
      <Header />
      <div className='seting-page'>
        <div className='setting-button'>
        <p>You can download preferred excel file here</p>
        <Button className='download-all' variant="primary" onClick={downloadAllLocalStorageDataAsCSV}>Download All</Button>
        <p>Backup all the recorded data to Google drive</p>
        <Button variant="success" onClick={() => window.open('https://drive.google.com/drive/home', '_blank')}>Backup</Button>
        <p>Reset all the recorded data</p>
        <Button className='reset-data' variant="danger" onClick={() => localStorage.clear()}>Reset All Data</Button>
        </div>

        <div className='account'>
          <h2>Manage account settings</h2>
          <img src={userData.photoURL} alt="User Photo" />
          <p>{userData.displayName}</p>
          <p>{userData.email}</p>

          <Button variant="warning" >Sign out</Button>
        </div>

        {/*.........................................................../////////////Footer */}
        <footer >
          {/* <Button variant="success" onClick={handleShowModal} >Add Reminder +</Button> */}
        </footer>
      </div>

      {/*................................................................. modal overlay */}
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton />
          <Modal.Body>
            <Form>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>

                <div id="date-Picker-container">
                  <DatePicker
                    id='date-Picker'
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    showTimeSelect
                    showIcon
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                  />
                </div>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
