import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { FaChartBar } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaBarsProgress } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";


export default function Header() {
  const location = useLocation();


  
  return (
    <div>
  
      <header className="app-header source-serif4-header">
      <nav className="nav-menu">
        <ul>
          <li className={location.pathname === '/Home' ? 'active' : ''}><a href="/Home">Overview<br></br><FaChartBar size={50} /></a></li>
          <li className={location.pathname === '/Transaction' ? 'active' : ''}><a href="/Transaction">Assets manager<br></br><LiaClipboardListSolid size={50} /></a></li>
          <li className={location.pathname === '/SetLimit' ? 'active' : ''}><a href="/SetLimit">Mirror Expense<br></br><FaBarsProgress size={50}/></a></li>
          <li className={location.pathname === '/Converter' ? 'active' : ''}><a href="/Converter">Currency converter<br></br><MdCurrencyExchange size={50}/></a></li>
          <li className={location.pathname === '/Notification' ? 'active' : ''}><a href="/Notification">Settings<br></br><IoIosNotifications size={55}/></a></li>
        </ul>
        
      </nav>
      
    </header>
 



      
    </div>
    
  )
}
