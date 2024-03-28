import React from 'react'
import './Transaction.css'
import Header from '../components/Header';

import { IoFastFoodOutline } from "react-icons/io5";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiHeartPlus } from "react-icons/gi";
import { FcSportsMode } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { GiMusicalNotes } from "react-icons/gi";
import { BiSolidArrowFromRight } from "react-icons/bi";
import { BiSolidArrowFromLeft } from "react-icons/bi";

export default function Transaction() {

  const iconMap = {
    "Food" : <IoFastFoodOutline size={40} color='green'/>,
    "Travel" : <GiCommercialAirplane size={40} color='red'/>,
    "Health" : <GiHeartPlus size={40} color='red'/>,
    "Sports" : <FcSportsMode size={40} />,
    "Salary" : <GiReceiveMoney size={40} color='#E9AE0B' />,
    "Education" : <GiBookCover size={36} color='purple'/>,
    "Entertainment" : <GiMusicalNotes size={40} color='#C0C0C0'/>,
    "Expense" : <BiSolidArrowFromRight size={20} color='red'/>,
    "Income" : <BiSolidArrowFromLeft size={20} color='green'/>

  }
  const listMaker = () => {
    const objArry = Object.keys(localStorage);
    const fullTable = [];
    objArry.forEach(day => {
      const listData = JSON.parse(localStorage.getItem(day));
      const rowData = [];
      rowData.push(
      <td>{iconMap[listData.category]}{listData.category}</td>,
      <td><span style={{ color: listData.transType == "Expense" ? 'red' : 'green' }}>{listData.amount}</span></td>,
      <td>{listData.description}</td>,
      <td>{iconMap[listData.transType]}{listData.TransFrom}</td>      
      );
      fullTable.push(
        <tr>{rowData}</tr>
      );
    });
    return fullTable;
  }


  return (
    <>
    <Header/>
    <div id='transPage'>
      <table id='transTable'>
        <tbody>
          {listMaker()}
        </tbody>
      </table>
      
    </div>
    </>
  )
}
