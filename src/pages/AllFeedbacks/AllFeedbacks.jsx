import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchAllFeedbackByUsers } from "../../services/APIService";

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState();
  const [currUser, setCurrUser] = useState();
  const { user_id } = useParams();
  useEffect(() => {
    const selectedUser = JSON.parse(localStorage.getItem("selected_user"));
    if (selectedUser) {
      setCurrUser(selectedUser);
    }
    (async () => {
      try {
        const res = await fetchAllFeedbackByUsers({ user_id });
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

  console.log(feedbacks);
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/traveller_manager_dashboard">
            Feedbacks for {currUser?.firstName} {currUser?.lastName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>

      {feedbacks ? (
        feedbacks?.length !== 0 ? (
          <div className="feedback_card">
            <ListGroup>
              {feedbacks.map((item, index) => {
                return (
                  <Card key={index} className="list_item">
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Title>Trip Details</Card.Title>
                          <div>
                            Driver Name: {item.Driver?.firstName} {item.Driver?.lastName}
                          </div>
                          <Card.Text>Trip Name: {item.Trip?.name}</Card.Text>
                        </Col>
                        <Col>
                          <div className="rating_box">
                            <div>Driver Rating:</div>
                            <div className="star-rating">
                              {renderStars(item.answer?.driverRating)}
                            </div>
                          </div>
                          <div className="rating_box">
                            <div>Trip Rating:</div>
                            <div className="star-rating">
                              {renderStars(item.answer?.tripRating)}
                            </div>
                          </div>
                          <div className="text_box">
                            Comments: {item.answer?.comments}
                          </div>
                          <div className="text_box">
                            Suggestions: {item.answer?.suggestions}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </ListGroup>
          </div>
        ) : (
          <h6>No Element</h6>
        )
      ) : (
        <h6>Loading</h6>
      )}
    </div>
  );
}

export default AllFeedbacks;
