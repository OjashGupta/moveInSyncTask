import { Button, Container } from "react-bootstrap";
import "./SubmittedPage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SubmittedPage() {
  return (
    <Container className="submitted_container">
      <img className="submit_img" src="/submit.png"></img>
      Your feedback has been submitted successfully!
      <Link to="/traveller_dashboard">Go Back to dashboard</Link>
    </Container>
  );
}

export default SubmittedPage;
