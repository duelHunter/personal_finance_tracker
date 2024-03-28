
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import Converter from './Pages/Converter';
import Transaction from './Pages/Transaction';
import SetLimit from './Pages/SetLimit';
import Notification from './Pages/Notification';
import { BrowserRouter,Route,Routes, useLocation } from 'react-router-dom';

import SignUp from './components/Auth/SignUp';
import LogIn from './components/Auth/LogIn';


function App() {

  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/LogIn' element={<LogIn/>}></Route>
        <Route exact path='/Home' element={<Home/>}></Route>
        <Route path='/Transaction' element={<Transaction/>}></Route>
        <Route path='/SetLimit' element={<SetLimit/>}></Route>
        <Route path='/Converter' element={<Converter/>}></Route>
        <Route path='/Notification' element={<Notification/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
