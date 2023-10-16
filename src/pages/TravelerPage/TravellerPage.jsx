import React, { useEffect, useState } from "react";
import { getTrips } from "../../services/APIService";
import "./TravelerPage.css";
import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";

function TravelerPage() {
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

  return (
    <Container className="traveller_container">
      <h1>Your Trips</h1>
      <hr></hr>
      {trips ? (
        trips?.length !== 0 ? (
          <ListGroup>
            {trips.map((item, index) => {
              return (
                <ListGroup.Item key={index}>
                  <a href={`/trip_feedback/${item.id}`}>{item.name}</a>
                </ListGroup.Item>
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
  );
}

export default TravelerPage;
