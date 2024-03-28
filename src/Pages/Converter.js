import React, { useState, useEffect } from 'react';
import './Converter.css';
import { IoMdSwap } from "react-icons/io";
import Header from '../components/Header';

export default function Converter() {
  const [exchangeRates, setExchangeRates] = useState({ usd: 1 });
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('lkr');
  const [inputAmount, setInputAmount] = useState();
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await fetch('https://www.floatrates.com/daily/usd.json');
        const data = await res.json();

        if (res.ok) {
          const rates = { usd: 1, ...data };
          setExchangeRates(rates);
        }
      } catch (error) {
        console.log('Error loading currency data');
      }
    };

    fetchExchangeRates();
  }, []); // Run only once on component mount

  const convert = (inputAmount) => {
    const fromRate = exchangeRates[fromCurrency]?.rate || 1; // Use 1 as default rate if not found
    const toRate = exchangeRates[toCurrency]?.rate || 1;

    // console.log(fromRate);
    // console.log(toRate);
    // console.log("inputed", inputAmount);
  
    // const convertedValue = (inputAmount * toRate) / fromRate;
    const convertedValue = inputAmount * 365;
    // setResult(isNaN(convertedValue) ? 'Invalid Input' : convertedValue.toFixed(2));
    setResult(convertedValue);
  };  

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
    convert();
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    convert();
  };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setInputAmount(amount);
    convert(amount); // Pass the amount to the convert function
  };



  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    convert();
  };

  return (
    <div className='converter-page'>
    <Header/>
    <div className="converter-container">

      <div className="content">
        <input
          type="number"
          value={inputAmount}
          placeholder="Enter amount"
          className="input-amount"
          onChange={handleAmountChange}
        />
        <div className="select-container">
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {Object.keys(exchangeRates).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode} - {exchangeRates[currencyCode].name}
              </option>
            ))}
          </select>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {Object.keys(exchangeRates).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode} - {exchangeRates[currencyCode].name}
              </option>
            ))}
          </select>
        </div>
        <div className="swap-btn" onClick={handleSwap}>
        <IoMdSwap size={40} />
        </div>
        <div className="result">
          <span className="result-currency">{toCurrency}</span> {result}
        </div>
      </div>
    </div>
    </div>
  );

}
