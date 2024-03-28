import './Home.css';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CurrencyInput from 'react-currency-input-field';
import Calendar from '../components/Calendar';
 

import Header from '../components/Header';
import { getFirestore, addDoc, collection, getDocs, doc } from 'firebase/firestore';


ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: ['rgb(20, 200, 100)', 'rgb(0, 0, 0)'],
        font: {
          size: 24,
        },
      },
    },
  },
  animation: false,
};

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState({
    monthlyIncome: 0,
    monthlyExpense: 0,
  });
  const [monthlyRemaining, setmonthlyRemaining] = useState(0);

  const [expenseList, setexpenseList] = useState([]);
  // 'Foods', 'Travel', 'Education', 'Entertainment', 'Fashion', 'Health', 'Fuel'
  const [categories, setCategories] = useState(['Salary', 'Award', 'Other Income']);
  const [transactionType, setTransactionType] = useState('Income');


  ////////////////////////////////////////////////////////Read expense data

  const db = getFirestore();
  const fetchPost = async () => {
    await getDocs(collection(db, "mycollection"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
        console.log(newData[0]);
        delete newData[0].id;
        const updatedExpenseList = Object.keys(newData[0]);
        setexpenseList(updatedExpenseList);
 
        });
  };
  
    useEffect(() => {
      fetchPost();
    }, []);

  useEffect(() => {
    monthly_In_Ex(new Date());
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  const saveData = () => {

    const transType = document.getElementById('transtype').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const TransFrom = document.getElementById('transfrom').value;
    const description = document.getElementById('description').value;

    const formData = {
      transType: transType,
      amount: amount,
      category: category,
      TransFrom: TransFrom,
      description: description,
    };

    const key = new Date();
    localStorage.setItem(key, JSON.stringify(formData));

    handleCloseModal();
    // console.log(formData);
   
    monthly_In_Ex(new Date());
 
  };

  const handleTransactionTypeChange = (e) => {
    const selectedTransactionType = e.target.value;
    setTransactionType(selectedTransactionType);

    if (selectedTransactionType === 'Income') {
      setCategories(['Salary', 'Award', 'Other Income']);
    } else if (selectedTransactionType === 'Expense') {
      setCategories(expenseList);
    } else if (selectedTransactionType === 'Transfer') {
      setCategories(['Transfer Category1', 'Transfer Category2', 'Transfer Category3']);
    }
  };
///////////////////////////////////////////////////monthly income and expence

  const monthly_In_Ex = (whichMonth) => {
    // console.log("monthly function callled");
    let monthlyIncomeTotal = 0;
    let monthlyExpenseTotal = 0;

    let days = Object.keys(localStorage);

    days.forEach((dayKey) => {
      const obj = JSON.parse(localStorage.getItem(dayKey));
      const day = new Date(dayKey);

      if (
        whichMonth.getFullYear() === day.getFullYear() &&
        whichMonth.getMonth() === day.getMonth()
      ) {
        if (obj && obj.transType === 'Income') {
          monthlyIncomeTotal += parseFloat(Number(obj.amount.replace(/,/g, '')).toFixed(2));
        } else if (obj && obj.transType === 'Expense') {
          monthlyExpenseTotal += parseFloat(Number(obj.amount.replace(/,/g, '')).toFixed(2));
        }
      }
    });
    setmonthlyRemaining(monthlyIncomeTotal - monthlyExpenseTotal);

    setChartData((prevChartData) => ({
      ...prevChartData,
      monthlyIncome: monthlyIncomeTotal,
      monthlyExpense: monthlyExpenseTotal,
    }));




  };
////////////////////////////////////////////////////////////
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Rs.',
        data: [chartData.monthlyIncome, chartData.monthlyExpense],
        backgroundColor: ['rgb(255, 191, 0)', 'rgb(80, 200, 120)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="left">
          <Calendar />
        </div>
        <div className="right">
          <div className="doughnut">
            <Doughnut data={data} options={chartOptions} />
          </div>
          <p>Remaining(Rs): {monthlyRemaining}</p>
        </div>
        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton />
            <Modal.Body>
              <Form>
                <Form.Label>Transaction type</Form.Label>
                <Form.Select aria-label="Default select example" id='transtype' onChange={handleTransactionTypeChange}>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Transfer">Transfer</option>
                </Form.Select>
                <Form.Label>Amount</Form.Label>
                <br />
                <CurrencyInput
                  className = 'form-control'
                  id="amount"
                  name="input-name"
                  placeholder="Rs:"
                  decimalsLimit={2}
                />
                <br />
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" id="category">
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label>Transfer from</Form.Label>
                <Form.Select aria-label="Default select example" id='transfrom'>
                  <option value="Wallet">Wallet</option>
                  <option value="Bank">Bank acount</option>
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control id='description' as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={saveData}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      
      <div>
        <footer >
          <Button variant="success" className='addNew inria-sans-bold' onClick={handleShowModal}>Add New +</Button>
        </footer>
      </div>
    </div>
  );
};

export default Home;
