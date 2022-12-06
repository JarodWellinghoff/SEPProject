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
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};