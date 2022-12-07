import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../Login/Login.js';
import Reviews from '../Pages/Review.js';
import BookTicket from '../Pages/BookTickets.js';
import CCForm from '../Pages/CCForm.js';
import TicketCode from '../Pages/TicketCode.js';
import BoughtTickets from '../Pages/BoughtTickets.js';
import useToken from './useToken.js';
import AdminDashboard from '../Pages/AdminDashboard.js';


function App() {
  // const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [user, setUser] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  async function onLogout() {
    console.log(token);
    await fetch('http://localhost:8080/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(
        { token: token }
      )
    });

    sessionStorage.removeItem('token');
    window.location.reload();
  }


  return (
    <div style={{ backgroundColor: '#404040', width: '1920px', height: '920px' }} className='wrapper'>
      <div>
        <Navbar bg="#404040">
          <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Ftexas-tech-logo-clip-art-7.png&f=1&nofb=1&ipt=313196dfce193458ddcd6eb445ae00644965ae5f58e5d06d96ee0658555c76cc&ipo=images' height='75' width='75'></img>
          <text style={{ color: 'white', fontSize: 40, paddingRight: '850px' }}>Movie Booking System</text>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <form>
            <Button variant="secondary">Search</Button>
          </form>
          <Button onClick={() => { onLogout() }}
            variant="danger" style={{ marginLeft: '10px' }}>Logout</Button>
        </Navbar>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/Pages/BoughtTickets' element={<BookTicket />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/Pages/Reviews' element={<Reviews />} />
          <Route path='/Pages/BookTickets' element={<BookTicket />} />
          <Route path='/CCForm' element={<CCForm />} />
          <Route path='/Pages/TicketCode' element={<TicketCode />} />
          <Route path='/Pages/AdminDashboard' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;