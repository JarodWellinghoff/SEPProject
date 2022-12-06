import React, { useEffect } from 'react';
import { Route, useNavigate, Link, Routes, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem.js';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu.js';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle.js';

export default function BookTicket() {
    const navigate = useNavigate();
    const redirectToDashboard = () => {
        navigate('/dashboard');
    }

    const redirectToCCForm = () => {
        // chack if all the fields are selected
        if (selectedTheater === 'Select Theater' || selectedShowTime === 'Select Show Time' || selectedSeats === 'Select # of Seats') {
            alert('Please select all the fields');
            return;
        }
        navigate('/CCForm',
            {
                state: {
                    movie: selectedMovie,
                    theater: selectedTheater,
                    showTime: selectedShowTime,
                    seat: selectedSeats
                }
            });
    }

    // get the movie from the state
    const { state } = useLocation();
    const selectedMovie = state.movie;

    // get the theater from the server
    const [theaters, setTheaters] = React.useState([]);
    const [showTimes, setShowTimes] = React.useState([]);
    const [selectedTheater, setSelectedTheater] = React.useState('Select Theater');
    const [selectedShowTime, setSelectedShowTime] = React.useState('Select Show Time');
    const [selectedSeats, setSelectedSeats] = React.useState('Select # of Seats');
    const fetchTheaters = async () => {
        const response = await fetch('http://localhost:8080/theaters');
        const data = await response.json();
        console.log(data);
        setTheaters(data);
    };
    useEffect(() => {
        fetchTheaters();
    }, [])

    // filter the showtimes for the selected moviw
    const filterShowTimes = (theater) => {
        const showTimes = theater.show_times.filter(show_times => show_times.movie_id === selectedMovie.id);
        console.log(showTimes);
        setShowTimes(showTimes);
    }

    // function to change the showtimes based on the theater selected
    const handleTheaterChange = (e) => {
        setSelectedTheater(e.target.text);
        setSelectedShowTime('Select Show Time');
        setSelectedSeats('Select # of Seats');
        const theater = theaters.find(theater => theater.name === e.target.text);
        console.log(theater);
        filterShowTimes(theater);
    }

    const handleShowTimeChange = (e) => {
        setSelectedShowTime(e.target.text);
    }

    const handleSeatsChange = (e) => {
        setSelectedSeats(e.target.text);
    }

    return (
        <div>
            <h2 style={{ color: 'white' }}>Book Tickets for {selectedMovie.title}</h2>
            <Row>
                <Col xs={1}>
                    <Dropdown>
                        <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: 'auto' }} variant="success" id="dropdown-basic">
                            {selectedTheater}
                        </DropdownToggle>
                        <DropdownMenu>
                            {theaters.map(theater => (
                                <DropdownItem key={theater.id} value={theater.name} onClick={handleTheaterChange}>{theater.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col xs={1}>
                    <Dropdown>
                        <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: 'auto' }} variant="success" id="dropdown-basic">
                            {selectedSeats}
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(seat => (
                                    <DropdownItem key={seat} value={seat} onClick={handleSeatsChange}>{seat}</DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col xs={1}>
                    <Dropdown>
                        <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: 'auto' }} variant="success" id="dropdown-basic">
                            {selectedShowTime}
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                showTimes.map((showTime, i) => (
                                    <DropdownItem key={i} value={showTime.show_time} onClick={handleShowTimeChange}>{showTime.show_time}</DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Row style={{ paddingTop: 100 }}>
                <Col xs={1}>
                    <Button style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} onClick={redirectToDashboard}>Cancel</Button>
                </Col>
                <Col xs={1}>
                    <Button style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} onClick={redirectToCCForm}>Book</Button>
                </Col>
            </Row>
        </div>
    )




    // return (
    //     <div>
    //         <h2 style={{ color: 'white' }}>Book Tickets</h2>
    //         <Row>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} variant="success" id="dropdown-basic">
    //                         Theatre
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>Red Raider Theatre</DropdownItem>
    //                         <DropdownItem>AMC</DropdownItem>
    //                         <DropdownItem>Alamo Drafthouse</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} variant="success" id="dropdown-basic">
    //                         # of seats
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>1</DropdownItem>
    //                         <DropdownItem>2</DropdownItem>
    //                         <DropdownItem>3</DropdownItem>
    //                         <DropdownItem>4</DropdownItem>
    //                         <DropdownItem>5</DropdownItem>
    //                         <DropdownItem>6</DropdownItem>
    //                         <DropdownItem>7</DropdownItem>
    //                         <DropdownItem>8</DropdownItem>
    //                         <DropdownItem>9</DropdownItem>
    //                         <DropdownItem>10</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} variant="success" id="dropdown-basic">
    //                         Showtimes
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>12:00 PM</DropdownItem>
    //                         <DropdownItem>3:00 PM</DropdownItem>
    //                         <DropdownItem>6:00 PM</DropdownItem>
    //                         <DropdownItem>9:00 PM</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Col xs={1}>
    //                 <Button style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} variant="success" id="dropdown-basic" onClick={redirectToCCForm}>
    //                     Book Tickets
    //                 </Button>
    //             </Col>
    //             <Col xs={1}>
    //                 <Button style={{ color: 'black', backgroundColor: 'white', textAlign: 'left', width: '105px' }} variant="success" id="dropdown-basic" onClick={redirectToDashboard}>
    //                     Cancel
    //                 </Button>
    //             </Col>
    //         </Row>
    //     </div>
    // )




    // return(
    //     <div >
    //         <h2 style={{color: 'white'}}>Book Tickets</h2>
    //         <Row>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{color: 'black', backgroundColor: 'white', textAlign: 'left',width: '105px'}} variant="success" id="dropdown-basic">
    //                         Theatre
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>Red Raider Theatre</DropdownItem>
    //                         <DropdownItem>AMC</DropdownItem>
    //                         <DropdownItem>Alamo Drafthouse</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{color: 'black', backgroundColor: 'white', textAlign: 'left',width: '105px'}} variant="success" id="dropdown-basic">
    //                         # of seats
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>1</DropdownItem>
    //                         <DropdownItem>2</DropdownItem>
    //                         <DropdownItem>3</DropdownItem>
    //                         <DropdownItem>4</DropdownItem>
    //                         <DropdownItem>5</DropdownItem>
    //                         <DropdownItem>6</DropdownItem>
    //                         <DropdownItem>7</DropdownItem>
    //                         <DropdownItem>8</DropdownItem>
    //                         <DropdownItem>9</DropdownItem>
    //                         <DropdownItem>10</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //             <Col xs={1}>
    //                 <Dropdown>
    //                     <DropdownToggle style={{color: 'black', backgroundColor: 'white', textAlign: 'left',width: '105px'}} variant="success" id="dropdown-basic">
    //                         Showtimes
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                         <DropdownItem>11:30am</DropdownItem>
    //                         <DropdownItem>2:00pm</DropdownItem>
    //                         <DropdownItem>8:00pm</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </Col>
    //             <Col xs={1}>
    //                 <Button> 
    //                     Book

    //                 </Button>
    //             </Col>
    //         </Row>
    //     </div>
    // )
}