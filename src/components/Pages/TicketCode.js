import React, { useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from 'qrcode.react';

export default function TicketCode() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [qrCode, setQRCode] = React.useState(null);
    console.log(state);
    const theater = state.theater;
    const movie = state.movie;
    const showtime = state.showtime;
    const seat = state.seat;
    const card = state.card;

    // add ticket to db
    const addTicket = async () => {
        const response = await fetch("http://localhost:8080/tickets/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: card.name_on_card,
                theater: theater,
                movie_title: movie.title,
                showtime: showtime,
                seat: seat
            }),
        });
        const data = await response.json();
        const ticket_id = data.id;
        setQRCode(ticket_id);
        console.log(data);
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
                    {theater} - {movie.title} - {showtime} - {seat} - {card.name_on_card}
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