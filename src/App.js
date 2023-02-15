import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders/Orders';
import OrderDetails from './components/OrderDetails';
// import Login  from './components/AdminAuth/Login';
import Login from './components/AdminAuth/Login';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/orders" element={< Orders/>} />
                  <Route exact path="/login" element={<Login/>} />
                  <Route exact path="/locations" element={<div></div>} />
                  <Route exact path="/orders/:id" element={<OrderDetails/>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;