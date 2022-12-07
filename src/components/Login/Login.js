import React, { useState, } from 'react';
import { Route, useNavigate, Link, Routes } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css';
import { Row } from 'react-bootstrap';

async function loginUser(credentials) {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      console.log(data);
      return data;
    })
  console.log(response.status, response.ok);
  if (response.ok) {
    console.log("Login successful");
    return response.json();
  }
  else {
    alert("Login failed");
    console.log("Login failed");
    return null;
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [currentStatus, setCurrentStatus] = useState('login');


  if (currentStatus === 'login') {
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        username,
        password
      });
      if (token) {
        setToken(token);
      }
    }



    return (
      <div className='login-wrapper'>
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <label>
              <p>Username</p>
              <input type='text' onChange={e => setUserName(e.target.value)} />
            </label>
          </Row>
          <Row>
            <label>
              <p>Password</p>
              <input type='password' onChange={e => setPassword(e.target.value)} />
            </label>
          </Row>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <button onClick={() => setCurrentStatus('register')}>Register</button>
      </div>
    )
  } else {
    // allow a user to register a new account
    // if the user already exists, display an error message
    // the user should be able to go back to the login page
    // the user can enter a username, password, their name, their email address, their home address, and their phone number
    // add a checkbox to indicate whether they are an admin or not
    // if signup is successful, display a message and go back to the login page
    // if signup is unsuccessful, display an error message
    const handleSubmit = async e => {
      e.preventDefault();
      const text = e.target.elements;
      const user = {
        username: text[0].value,
        password: text[1].value,
        name: text[2].value,
        email: text[3].value,
        address: text[4].value,
        phone: text[5].value,
        admin: text[6].checked
      }
      console.log(user);
      const response = await fetch('http://localhost:8080/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
      });
      if (response.ok) {
        alert("Signup successful");
        setCurrentStatus('login');
      }
      else {
        alert("Signup failed");
      }
    }

    return (
      <div className='login-wrapper'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <label>
              <p>Username</p>
              <input type='text' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Password</p>
              <input type='password' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Name</p>
              <input type='text' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Email</p>
              <input type='text' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Address</p>
              <input type='text' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Phone</p>
              <input type='text' />
            </label>
          </Row>
          <Row>
            <label>
              <p>Admin</p>
              <input type='checkbox' />
            </label>
          </Row>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <button onClick={() => setCurrentStatus('login')}>Login</button>
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};