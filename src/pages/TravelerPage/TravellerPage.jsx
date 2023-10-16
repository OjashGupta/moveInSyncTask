import React, { useEffect, useState } from "react";
import { getTrips } from "../../services/APIService";
import "./TravelerPage.css";
import { computeHeadingLevel } from "@testing-library/react";
import { Link } from "react-router-dom";

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
    <div className="traveller_container">
      <h1>Your Trips</h1>
      <hr></hr>
      { trips? (
      trips?.length !== 0 ? (
        <ul>
          {trips.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`/trip_feedback/${item.id}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <h6>No Element</h6>
      )
      ):(
        <h6>Loading</h6>
      )
    }
    </div>
  );
}

export default TravelerPage;
