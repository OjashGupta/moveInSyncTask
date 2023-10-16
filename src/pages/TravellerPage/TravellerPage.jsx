import React, { useEffect, useState } from "react";
import { getTrips } from "../../services/APIService";
import "./TravellerPage.css";
import {
  Button,
  Card,
  Container,
  ListGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TravellerPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState();

  useEffect(() => {
    const user_id = localStorage.getItem("userID");

    (async () => {
      if (user_id) {
        try {
          const res = await getTrips({ user_id: user_id });
          setTrips(res);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  console.log(trips);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/traveller_dashboard">
            Traveller Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="traveller-list-container">
        {trips ? (
          trips?.length !== 0 ? (
            <ListGroup>
              {trips.map((item, index) => {
                return (
                  <Card key={index} className="list_item">
                    <a href={`/trip_feedback/${item.id}`}>{item.name}</a>
                    <img src="/right_arrow.svg" />
                  </Card>
                );
              })}
            </ListGroup>
          ) : (
            <h6>No Element</h6>
          )
        ) : (
          <h6>Loading</h6>
        )}
      </Container>
    </div>
  );
}

export default TravellerPage;
