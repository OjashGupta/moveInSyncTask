import { useEffect, useState } from "react";
import { fetchAllFeedbacks } from "../../../../services/APIService";
import { Card, Container, ListGroup } from "react-bootstrap";
import "./Trips.css"
import { useNavigate } from "react-router-dom";


function Drivers() {
  const [feedbacks, setFeedbacks] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllFeedbacks();
        console.log("in trips", res.data["data"]);
        if (res) {
          setFeedbacks(res.data["data"]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };
  return (
    <Container>
      {feedbacks ? (
        feedbacks?.length !== 0 ? (
          <ListGroup>
            {feedbacks.map((item, index) => {
              return (
                <Card key={index} className="list_item" onClick={()=>{
                    localStorage.setItem("userdata", JSON.stringify(item.User));
                    navigate(`/trip_feedback/${item.TripId}`);
                }}>
                  <Card.Body className="c-card-body">
                    <Card.Text>
                      Trip Name: {item.Trip.name}
                    </Card.Text>
                    <div className="star-rating">
                      {renderStars(item.answer?.tripRating)}
                    </div>
                  </Card.Body>
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
  );
}

export default Drivers;
