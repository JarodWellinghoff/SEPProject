import React, { useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from 'qrcode.react';

export default function TicketCode() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const { state } = useLocation();
    const [qrCode, setQRCode] = React.useState(null);
    console.log(state);
    const movie = state.movie;
    const showtime = state.showtime;
    const seat = state.seat;
    const card = state.card;

    // add ticket to db
    const addTicket = async () => {
        const th = await fetch('http://localhost:8080/theaters');
        const th_data = await th.json();
        console.log(th_data);
        const theaters = th_data;
        const theater = theaters.find(theater => theater.name === state.theater);


        // get user from token
        const obj = JSON.parse(token);
        const user_response = await fetch(`http://localhost:8080/users/token/${obj.token}`);
        const user_data = await user_response.json();
        const user_id = user_data.user.id;
        console.log(user_data.user.id);
        console.log(theater);

        const response = await fetch("http://localhost:8080/tickets/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                theater_id: theater.id,
                movie_id: movie.id,
                showtime: showtime,
                seat: seat
            }),
        });
        const data = await response.json();
        const ticket_id = data.id;
        setQRCode(ticket_id);
        // console.log(data);
    };
    useEffect(() => {
        addTicket();
    }, []);

    function redirectToHome() {
        navigate("../Dashboard");
    }

    return (
        <div>
            <Row>
                <h1>Ticket Code</h1>
            </Row>
            <Row>
                <h2 style={{ color: 'white' }}>
                    {state.theater} - {movie.title} - {showtime} - {seat} - {card.name_on_card}
                </h2>
            </Row>
            <Row><QRCodeCanvas
                value={"http://localhost:8080/tickets/id/" + qrCode}
                size={400}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
            />
            </Row>
            <Row>
                <button onClick={redirectToHome}>Return Home</button>
            </Row>
        </div>
    );
}