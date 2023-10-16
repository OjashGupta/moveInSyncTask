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
    return response.data["data"];
  } catch (error) {
    console.log(error);
  }
}

async function sendFeedbackToTrip({ payload }) {
  try {
    const response = await axios.post("/api/v1/feedback/", payload);
    console.log(response);
    return response;
  } catch (error) {}
}

async function fetchAllUsers() {
  try {
    const res = await axios.get("/api/v1/users");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllFeedbackByUsers({ user_id }) {
  try {
    const res = await axios.post("/api/v1/feedback/users", {
      user_id: user_id,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}


async function fetchAllDrivers() {
  try {
    const res = await axios.get("/api/v1/driver");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllFeedbacks() {
  try {
    const res = await axios.get("/api/v1/feedback");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function fetchFeedbackById({feed_id}) {
  try {
    const res = await axios.get("/api/v1/feedback/${feed_id}");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}



export {
  getTrips,
  login,
  getTripById,
  sendFeedbackToTrip,
  fetchAllUsers,
  fetchAllFeedbackByUsers,
  fetchAllDrivers,
  fetchAllFeedbacks,
  fetchFeedbackById
};
