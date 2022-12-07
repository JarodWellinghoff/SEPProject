import React, { useEffect } from 'react';
import { Route, useNavigate, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Dashboard({ props }) {
  const navigate = useNavigate();
  const [movies, setMovies] = React.useState([]);
  const [userStatus, setUserStatus] = React.useState(false);

  function redirectToReview(movie) {
    //Redirect to the python page
    navigate("../Pages/Reviews",
      { state: { movie: movie } });
  };
  function redirectToTickets(movie) {
    //Redirect to the python page
    navigate("../Pages/BookTickets",
      { state: { movie: movie } }
    );
  };
  function redirectToAdmin(movie) {
    //Redirect to the python page
    navigate("../Pages/AdminDashboard",
      { state: { movie: movie } }
    );
  };
  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8080/movies');
    const data = await response.json();
    console.log(data);
    setMovies(data);
  };

  // fetch user info on page load and check if user is admin
  const fetchUser = async () => {
    const tokenString = sessionStorage.getItem('token');
    const tokenObj = JSON.parse(tokenString);
    const response = await fetch('http://localhost:8080/users/token/' + tokenObj.token);
    const data = await response.json();
    const user = data.user;
    setUserStatus(user.admin);
  };

  const displayAdminButton = () => {
    console.log(userStatus);
    if (userStatus) {
      return (
        <Button style={{ width: '120px' }} variant="secondary"
          onClick={() => redirectToAdmin()}
        >
          Admin
        </Button>
      );
    }
  }


  useEffect(() => {
    fetchMovies();
    fetchUser();
  }, []);


  // split the movies into 2 arrays, one for upcoming and one for now showing
  const nowShowing = movies.filter(movie => movie.now_playing);
  const upcoming = movies.filter(movie => !movie.now_playing);

  return (
    <div style={{ backgroundColor: 'gray', height: '700px' }}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Currently showing</h2>
      {displayAdminButton()}
      <table style={{}}>
        <thead>
          {
            nowShowing.map((movie, index) => {
              return (
                <th key={index}>
                  <td style={{ paddingLeft: "150px", margin: 30 }}>
                    <Col style={{ width: 135 }}>
                      <Row>
                        <img src={movie.poster} height='200' width='135' alt='' onClick={() => redirectToReview(movie)}></img>
                      </Row>
                      <Row>
                        <Button style={{ width: '120px' }} variant="secondary"
                          onClick={() => redirectToReview(movie)}
                        >
                          More Info
                        </Button>
                        <Button style={{ width: '120px' }} variant="secondary"
                          onClick={() => redirectToTickets(movie)}
                        >
                          Book Tickets
                        </Button>
                      </Row>
                    </Col>
                  </td>
                </th>
              )
            })
          }
        </thead>
      </table>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Upcoming</h2>
      <table style={{}}>
        <tbody>
          {
            upcoming.map((movie, index) => {
              return (
                <th key={index}>
                  <td style={{ paddingLeft: "150px", margin: 30 }}>
                    <Col style={{ width: 135 }}>
                      <Row>
                        <img src={movie.poster} height='200' width='135' alt='' onClick={() => redirectToReview(movie)}></img>
                      </Row>
                      <Row>
                        <Button style={{ width: '120px' }} variant="secondary"
                          onClick={() => redirectToReview(movie)}
                        >
                          More Info
                        </Button>
                      </Row>
                    </Col>
                  </td>
                </th>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
