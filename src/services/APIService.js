import axios from "axios";

async function getTrips({ user_id }) {
  try {
    const response = await axios.post("/api/v1/trip/getAll", {
      user_id: user_id,
    });
    console.log(response);
    if (response) {
      const trips = response.data["data"];
      return trips;
    }
  } catch (error) {
    console.error(error);
  }
}

async function login({ email, password }) {
  try {
    const response = await axios.post("/api/v1/auth/login", {
      email: email,
      password: password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTripById({ tripId }) {
  try {
    const response = await axios.get(`/api/v1/trip/${tripId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function sendFeedbackToTrip() {
  try {
  } catch (error) {}
}

export { getTrips, login, getTripById };
