import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export default function Reviews() {
  console.log(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = sessionStorage.getItem('token');
  const selectedMovie = state.movie;
  const [reviews, setReviews] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({});

  function redirectToTickets(movie) {
    //Redirect to the python page
    navigate("../Pages/BookTickets",
      { state: { movie: movie } }
    );
  };

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8080/users');
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  // search for the reviews for the selected movie and set the state
  const fetchReviews = async () => {
    const response = await fetch('http://localhost:8080/reviews');
    const data = await response.json();
    const reviews = data.filter(review => review.movie_id === selectedMovie.id);
    // sort the reviews by date newest to oldest
    reviews.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    console.log(reviews);
    setReviews(reviews);
  };

  // fetch the user by token
  const fetchUser = async () => {
    const tokenObj = JSON.parse(token);
    // console.log(tokenObj.token);
    const response = await fetch('http://localhost:8080/users/token/' + tokenObj.token);
    const data = await response.json()
      .then(data => {
        setUser(data.user);
      })
  };

  useEffect(() => {
    fetchReviews();
    fetchUsers();
    fetchUser();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const text = e.target.elements;
    console.log(text[0].value);
    if (text[0].value === '') {
      return;
    }
    console.log('asdfasdf' + user);
    const review = {
      user_id: user.id,
      movie_id: selectedMovie.id,
      text: text[0].value,
      date: new Date()
    }
    const response = await fetch('http://localhost:8080/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review })
    });
    const data = await response.json();
    console.log(data);
    // add the new review to the reviews array
    fetchReviews();
    e.target.reset();

  }

  // function to render the reviews in a table
  const renderReviews = () => {
    return (
      <table style={{ width: '100%' }}>
        <tbody>
          {
            reviews.map((review, index) => {
              try {
                const user = users.find(user => user.id === review.user_id);
                return (
                  <tr key={index} style={{ width: '100%', borderTop: "1px solid rgba(255,255,255,0.5)" }}>
                    <td style={{ textAlign: 'left', color: 'white' }}>{user.name}</td>
                    <td style={{ textAlign: 'center', color: 'white' }}>{review.text}</td>
                  </tr>
                )
              } catch (error) {
                return null;
              }
            })
          }
        </tbody>
      </table>
    )
  };


  //


  return (
    <div>
      <Row>
        <h1 style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.title}</h1>
      </Row>
      <Row style={{ width: 1000 }}>
        <Col>
          <img src={selectedMovie.poster} height='400' width='275' alt=''></img>
        </Col>
        <Col>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Runtime</h3>
          <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.run_time}</p>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Rating</h3>
          <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.rating}</p>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Genre</h3>
          <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.genre}</p>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Release Date</h3>
          <p style={{ textAlign: 'left', color: 'white' }}>{selectedMovie.release_date}</p>
        </Col>
        <Col>
          <button onClick={() => redirectToTickets(selectedMovie)}
            style={{ backgroundColor: 'white', color: 'black', height: '50px', width: '150px' }}>Book Tickets</button>
        </Col>
        <Col>
          <Row>
            <h2 style={{ textAlign: 'left', color: 'white' }}>Reviews</h2>
          </Row>
          <Row>
            <form onSubmit={handleSubmit}>
              <input type="text" name="review" placeholder="Write a review" style={{ width: '300px' }} />
              <input type="submit" value="SUBMIT" />
            </form>
          </Row>
          <Row>
            {renderReviews()}
          </Row>
        </Col>
      </Row >
      <Row style={{ width: 1000 }}>
        <Col>
          <h2 style={{ textAlign: 'left', color: 'white' }}>Synopsis</h2>
          <p style={{ textAlign: 'left', color: 'white', width: 400 }}>{selectedMovie.synopsis}</p>
        </Col>
        <Col>
          <h2 style={{ textAlign: 'left', color: 'white' }}>Cast</h2>
          <h4 style={{ textAlign: 'left', color: 'white', width: 400 }}>Director</h4>
          <p style={{ textAlign: 'left', color: 'white', width: 400, paddingLeft: 30 }}>{selectedMovie.director}</p>
          <h4 style={{ textAlign: 'left', color: 'white', width: 400 }}>Actors</h4>
          {
            selectedMovie.cast.map((actor, index) => {
              return (
                <p style={{ textAlign: 'left', color: 'white', width: 400, height: 10, paddingLeft: 30 }} key={index}>{actor}</p>
              )
            })
          }
          <a href={selectedMovie.IMDB_link} target="_blank" rel="noreferrer">
            See More..
          </a>
        </Col>
      </Row>
    </div >
  )
}
