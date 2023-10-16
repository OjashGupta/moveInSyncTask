import { useEffect, useState } from "react";
import { getTripById, getTrips } from "../../../services/APIService";
import { useParams } from "react-router-dom";

function FeedbackPage() {
  const { tripId } = useParams();
  const [tripID, setTripID] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [trip, setTrip] = useState();
  useEffect(() => {
    (async () => {
      if (tripId) {
        try {
          const res = await getTripById({ tripId: tripId });
          console.log(res);
          setTrip(res);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Trip ID"
          value={tripID}
          onChange={(e) => setTripID(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        {/* Customizable feedback questions can be added here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackPage;
