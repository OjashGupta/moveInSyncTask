import { useEffect, useState } from "react";
import { getTripById, sendFeedbackToTrip } from "../../../services/APIService";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import "./FeedbackPage.css";

function FeedbackPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [user, setUser] = useState();

  const [feedbackPresent, setFeedbackPresent] = useState(false);

  const [driverRating, setDriverRating] = useState(0);
  const [tripRating, setTripRating] = useState(0);
  const [comments, setComments] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const [trip, setTrip] = useState();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (userdata) {
      setUser(userdata);
    }
    (async () => {
      if (tripId) {
        try {
          const res = await getTripById({ tripId: tripId });
          console.log(res);
          setTrip(res);
          if (res.feedback) {
            setFeedbackPresent(true);
            setDriverRating(res.feedback.answer.driverRating);
            setTripRating(res.feedback.answer.tripRating);
            setComments(res.feedback.answer.comments);
            setSuggestions(res.feedback.answer.suggestions);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      user_id: trip.UserId,
      trip_id: trip.id,
      driver_id: trip.DriverId,
      answer: {
        driverRating: driverRating,
        tripRating: tripRating,
        comments: comments,
        suggestions: suggestions,
      },
    };

    console.log(payload);

    (async () => {
      try {
        const res = await sendFeedbackToTrip({ payload });
        console.log(res);
        if (res.status === 201) {
          navigate("/feedback_submitted");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleStarClick = (selectedRating, action) => {
    if (action === "driver") {
      setDriverRating(selectedRating);
    } else {
      setTripRating(selectedRating);
    }
  };

  const renderStars = (action) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= (action === "driver" ? driverRating : tripRating)
              ? "star filled"
              : "star"
          }
          onClick={() => {
            if (!feedbackPresent) {
              handleStarClick(i, action);
            }
          }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/traveller_dashboard">Trip Feedback</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="card-grid">
        <Row>
          <Col>
            <Card className="c-card">
              <Card.Body>
                <Card.Title>Trip Details</Card.Title>
                <Card.Text>Trip Name: {trip?.name}</Card.Text>
                <Card.Text>Trip Desc: {trip?.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="c-card">
              <Card.Body>
                <Card.Title>Traveller Details</Card.Title>
                <Card.Text>
                  Name: {user?.firstName} {user?.lastName}
                </Card.Text>
                <Card.Text>Email: {user?.email} </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="c-card">
              <Card.Body>
                <Card.Title>Driver Details</Card.Title>
                <Card.Text>
                  Name: {trip?.["Driver"].firstName}
                  {trip?.["Driver"].lastName}
                </Card.Text>
                <Card.Text>Email: {trip?.["Driver"].email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {feedbackPresent ? (
          <Card className="feedback_card">
            <div className="rating_box">
              <span>Driver Rating:</span>
              <div className="star-rating">{renderStars("driver")}</div>
            </div>
            <div className="rating_box">
              <span>Trip Rating:</span>
              <div className="star-rating">{renderStars("trip")}</div>
            </div>
            <div className="text_box">Comments: {comments}</div>
            <div className="text_box">Suggestions: {suggestions}</div>
          </Card>
        ) : (
          <div className="form_box">
            <form onSubmit={handleSubmit}>
              <label>
                How would you rate the Driver*:
                <br />
                <div className="star-rating">{renderStars("driver")}</div>
              </label>
              <label>
                How would you rate the Trip*:
                <br />
                <div className="star-rating">{renderStars("trip")}</div>
              </label>
              <label>
                How was your overall experience* (NA if nothing):
                <br />
                <textarea
                  rows="2"
                  cols="100"
                  placeholder="Comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </label>
              <label>
                Anything you would to suggest* (NA if nothing):
                <br />
                <textarea
                  rows="2"
                  cols="100"
                  placeholder="Suggestions"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                />
              </label>
              <button
                className="c-btn"
                type="submit"
                disabled={!(driverRating && tripRating)}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackPage;
