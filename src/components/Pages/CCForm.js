// React page with react-bootstrap for a user to enter credit card information
// and submit the form to the server.

import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";

export default function CCForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    const theater = state.theater;
    const movie = state.movie;
    const showTime = state.showTime;
    const seat = state.seat;
    const [cardNumber, setCardNumber] = useState();
    const [cardName, setCardName] = useState();
    const [expDate, setExpDate] = useState();
    const [cvv, setCVV] = useState();

    const handleSubmit = async e => {
        setCardNumber(e.target[0].value);
        setCardName(e.target[1].value);
        setExpDate(e.target[2].value);
        setCVV(e.target[3].value);
        e.preventDefault();
        // check if all fields are filled out
        if (!cardNumber || !cardName || !expDate || !cvv) {
            alert('Please fill out all fields.');
            return;
        }
        // get cards from db
        const response = await fetch('http://localhost:8080/bank');
        const data = await response.json();
        console.log(data);
        // check if card number is valid
        const card = data.find(card => card.card_number === cardNumber);
        console.log(card);
        if (!card) {
            alert('Invalid card.');
            return;
        }
        // check if card name is valid
        if (card.name_on_card !== cardName) {
            alert('Invalid cardNA.');
            return;
        }
        // check if expiration date is valid
        if (card.card_expiry !== expDate) {
            alert('Invalid cardDA.');
            return;
        }
        // check if cvv is valid
        if (card.card_cvv !== cvv) {
            alert('Invalid cardCVV.');
            return;
        }
        // if all checks pass, alert user and redirect to ticketCode page
        alert('Payment successful!');
        navigate('../Pages/TicketCode',
            {
                state: {
                    card: card,
                    theater: theater,
                    movie: movie,
                    showtime: showTime,
                    seat: seat
                }
            });
    }

    const redirectToTickets = () => {
        navigate('/tickets');
    }

    return (
        <div className='ccform-wrapper'>
            <h1 style={{ color: 'white' }}>
                Enter Credit Card Information
            </h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <label style={{ color: 'white' }}>
                        <input type='text' placeholder='Card Number' onChange={e => setCardNumber(e.target.value)} />
                    </label>
                </Row>
                <Row>
                    <label style={{ color: 'white' }}>
                        <input type='text' placeholder='Name on Card' onChange={e => setCardName(e.target.value)} />
                    </label>
                </Row>
                <Row>
                    <label style={{ color: 'white' }}>
                        <input type='text' placeholder='Exp Date' onChange={e => setExpDate(e.target.value)} />
                    </label>
                </Row>
                <Row>
                    <label style={{ color: 'white' }}>
                        <input type='text' placeholder='CVV' onChange={e => setCVV(e.target.value)} />
                    </label>
                </Row>
                <div>
                    <button type='submit'>Submit</button>
                    <button type='submit' onClick={redirectToTickets}>Cancel</button>
                </div>

            </form>
        </div>
    )
}