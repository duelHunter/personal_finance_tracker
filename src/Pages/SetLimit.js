import React, { useState, useEffect } from 'react';
import './SetLimit.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Header from '../components/Header';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { getFirestore, addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { isElement } from 'react-dom/test-utils';

ChartJS.register(ArcElement, Tooltip, Legend);
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: ['#2c3e50', '#ecf0f1'],
        font: {
          size: 18,
          family: 'Source-Serif-4',
        },
      },
    },
  },
  animation: false,
};

export default function SetLimit() {

  const [chartData, setChartData] = useState({
    monthlyIncome: 0,
    monthlyExpense: 0,
  });

  const [expenseType, setexpenseType] = useState("");
  const [monthlyLimit, setmonthlyLimit] = useState("");
  const [updatedExpenseNameObj, setupdatedExpenseNameObj] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [progressList, setprogressList] = useState([]);
  const [doughnutExpenseValue, setdoughnutExpenseValue] = useState([]);
  const [doughnutExpenseName, setdoughnutExpenseName] = useState([]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const db = getFirestore();
  /////////////////////////////////////////////////..............Send save new data
  const saveDataToFirestore = async (expenseType) => {
    const collectionRef = collection(db, "mycollection");
    
    //////////////////////////////////////////////////// Get the existing data
    const querySnapshot = await getDocs(collectionRef);
    const existingData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];

    ///////////////////////////////////////////////////// Update the existing field 

      //////////////////////////////////////////////////// Update the document with the new data
    await updateDoc(doc(db, "mycollection", existingData.id), { [expenseType]: monthlyLimit });


    setexpenseType(""); ///////////////////////////// Clear the input field after saving
    setmonthlyLimit(""); 
  };
  
    //////////////////////////////////////////////////.......................Read expense data

    const fetchPost = async () => {
      await getDocs(collection(db, "mycollection"))
        .then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
          delete newData[0].id;
          //const updatedExpenseList = Object.keys(newData[0]);
          //console.log(newData[0]); 
          setupdatedExpenseNameObj(newData[0]);
          });
    };
    
    useEffect(() => {
      fetchPost();
    }, []);
    useEffect(() => {
      ///////////calculate percentage and add progressbars

      const progressList = [];
      const doughnutExpenseName = [];
      const doughnutExpenseValue = [];
      const expenseKey = Object.keys(updatedExpenseNameObj);
      expenseKey.forEach((key) => {
        console.log(key);
        console.log(updatedExpenseNameObj[key]);
        const rate = (selectedExpenseCalculate(new Date(), key) / updatedExpenseNameObj[key]) * 100;
        progressList.push(<p>{key}</p>,<ProgressBar now={rate}/>); //label={key}
        doughnutExpenseName.push(key);
        doughnutExpenseValue.push(selectedExpenseCalculate(new Date(), key));

      });
      setprogressList(progressList);
      setdoughnutExpenseName(doughnutExpenseName);
      setdoughnutExpenseValue(doughnutExpenseValue);


    },[updatedExpenseNameObj]);
  /////////////////////////////////////////////specified expense calculate
  const selectedExpenseCalculate = (whichMonth, key) => {

    let days = Object.keys(localStorage);
    let totalExpense = 0
    days.forEach((dayKey) => {
      const obj = JSON.parse(localStorage.getItem(dayKey));
      const day = new Date(dayKey);

      if (
        whichMonth.getFullYear() === day.getFullYear() &&
        whichMonth.getMonth() === day.getMonth()
      ) {
        if(obj && obj.category===key){
          totalExpense += parseFloat(Number(obj.amount.replace(/,/g, '')).toFixed(2));
        }
      }
    });
    return totalExpense;

  };
  //////////////////////////////////////////////////////

  const data = {
    labels: doughnutExpenseName,
    datasets: [
      {
        label: 'Rs.',
        data: doughnutExpenseValue,
        backgroundColor: [
          '#bf7b87',  
          '#60d9e8',  
          '#603e68',   
          '#2a5d9a',   
          'rgb(80, 200, 120)',  
        ],
        borderColor: 'rgba(255, 255, 255)', 
        borderWidth: 0
      },
    ],
  };
  

  return (
    <div>
      <Header />

      <div className="setlimit-container">
        <div className='expense-doughnut'>
          <Doughnut data={data} options={chartOptions} />
        </div>

        <div className="progressBar source-serif4-para">
          {progressList}

        </div>
      </div>
    
      <div>
        <footer >
          <Button variant="success" onClick={handleShowModal} className='addNew inria-sans-bold'>Add Category +</Button>
        </footer>
      </div>

{/*................................................................. modal overlay */}
      <div>
      <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton />
            <Modal.Body>
              <Form>
                
                <Form.Group className="mb-3">
                  <Form.Label>Expense type</Form.Label>
                  <Form.Control id='description' as="textarea" rows={2} value={expenseType} onChange={(e) => setexpenseType(e.target.value)} />
                  <Form.Label>Monthly Limit</Form.Label>
                  <Form.Control as="textarea" rows={1} value={monthlyLimit} onChange={(e) => setmonthlyLimit(e.target.value)} />
                </Form.Group>
                

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                saveDataToFirestore(expenseType);
                setTimeout(fetchPost,2000);
                handleCloseModal();
              }}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
      </div>

    </div>
  );
}
