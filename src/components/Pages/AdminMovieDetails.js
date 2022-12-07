import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export default function Reviews() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const selectedMovie = state.movie;
    const [runTime, setRunTime] = React.useState(selectedMovie.run_time);
    const [rating, setRating] = React.useState(selectedMovie.rating);
    const [genre, setGenre] = React.useState(selectedMovie.genre);
    const [releaseDate, setReleaseDate] = React.useState(selectedMovie.release_date);
    const [showTimes, setShowTimes] = React.useState(selectedMovie.show_times);
    const [synopsis, setSynopsis] = React.useState(selectedMovie.synopsis);

    const handleSubmit = async e => {
        // get the text values from the form
        // if the text values are empty, set them to the current values

    }
    const handleShowTimesSubmit = async e => {

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <h1 style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.title}</h1>
                </Row>
                <Row style={{ width: 1000 }}>
                    <Col>
                        <img src={selectedMovie.poster} height='400' width='275' alt=''></img>
                    </Col>
                    <Col>
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Runtime</h3>
                        <input type='text' placeholder={selectedMovie.run_time} />
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Rating</h3>
                        <input type='text' placeholder={selectedMovie.rating} />
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Genre</h3>
                        <input type='text' placeholder={selectedMovie.genre} />
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Release Date</h3>
                        <input type='text' placeholder={selectedMovie.release_date} />
                    </Col>
                    <Col>
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Synopsis</h3>
                        <textarea placeholder={selectedMovie.synopsis} style={{ width: 400, height: 300 }} />
                        <button style={{ width: '120px' }} type='submit' variant="secondary">
                            Save Details
                        </button>
                    </Col>
                </Row>
                <Col>
                </Col>
            </form>
            <form onSubmit={handleShowTimesSubmit}>
                <Row style={{ width: 1000 }}>
                    <Col>
                        <h3 style={{ textAlign: 'left', color: 'white' }}>Show Times</h3>
                        <input type='text' placeholder={selectedMovie.show_times} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ width: '120px' }} variant="secondary">
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}






    // return (
    // <div>
    //     <Row>
    //         <h1 style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.title}</h1>
    //     </Row>
    //     <Row style={{ width: 1000 }}>
    //         <Col>
    //             <img src={selectedMovie.poster} height='400' width='275' alt=''></img>
    //         </Col>
    //         <Col>
    //             <h3 style={{ textAlign: 'left', color: 'white' }}>Runtime</h3>
    //             <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.run_time}</p>
    //             <h3 style={{ textAlign: 'left', color: 'white' }}>Rating</h3>
    //             <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.rating}</p>
    //             <h3 style={{ textAlign: 'left', color: 'white' }}>Genre</h3>
    //             <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.genre}</p>
    //             <h3 style={{ textAlign: 'left', color: 'white' }}>Release Date</h3>
    //             <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.release_date}</p>
    //         </Col>
    //         <Col>
    //             <button onClick={() => redirectToTickets(selectedMovie)}
    //                 style={{ backgroundColor: 'white', color: 'black', height: '50px', width: '150px' }}>Book Tickets</button>
    //         </Col>
    //         <Col>
    //             <Row>
    //                 <h2 style={{ textAlign: 'left', color: 'white' }}>Reviews</h2>
    //             </Row>
    //             <Row>
    //                 <form onSubmit={handleSubmit}>
    //                     <input type="text" name="review" placeholder="Write a review" style={{ width: '300px' }} />
    //                     <input type="submit" value="SUBMIT" />
    //                 </form>
    //             </Row>
    //             <Row>
    //                 {renderReviews()}
    //             </Row>
    //         </Col>
    //     </Row >
    //     <Row style={{ width: 1000 }}>
    //         <Col>
    //             <h2 style={{ textAlign: 'left', color: 'white' }}>Synopsis</h2>
    //             <p style={{ textAlign: 'left', color: 'white', width: 400 }}>{selectedMovie.synopsis}</p>
    //         </Col>
    //         <Col>
    //             <h2 style={{ textAlign: 'left', color: 'white' }}>Cast</h2>
    //             <h4 style={{ textAlign: 'left', color: 'white', width: 400 }}>Director</h4>
    //             <p style={{ textAlign: 'left', color: 'white', width: 400, paddingLeft: 30 }}>{selectedMovie.director}</p>
    //             <h4 style={{ textAlign: 'left', color: 'white', width: 400 }}>Actors</h4>
    //             {
    //                 selectedMovie.cast.map((actor, index) => {
    //                     return (
    //                         <p style={{ textAlign: 'left', color: 'white', width: 400, height: 10, paddingLeft: 30 }} key={index}>{actor}</p>
    //                     )
    //                 })
    //             }
    //             <a href={selectedMovie.IMDB_link} target="_blank" rel="noreferrer">
    //                 See More..
    //             </a>
    //         </Col>
    //     </Row>
    // </div >
    // )
// }
