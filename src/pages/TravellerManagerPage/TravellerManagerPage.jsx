import React, { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "./TravellerManagerPage.css";
import Traveller from "./components/Travellers/Travellers";
import Drivers from "./components/Drivers/Drivers";
import Trips from "./components/Trips/Trips";
import { useNavigate } from "react-router-dom";
function TravellerManagerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("travellers");
  const handleNavClick = (e) => {
    setActiveTab(e.target.name);
  };
  const logoutManager = () =>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/transport_manager_dashboard">
            Traveller Manager Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Feedbacks" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={(e) => {
                    handleNavClick(e);
                  }}
                  name="travellers"
                  className={activeTab === "travellers" ? "active-tab" : ""}
                >
                  By Travellers
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={(e) => {
                    handleNavClick(e);
                  }}
                  name="trips"
                  className={activeTab === "trips" ? "active-tab" : ""}
                >
                  By Trips
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={(e) => {
                    handleNavClick(e);
                  }}
                  name="drivers"
                  className={activeTab === "drivers" ? "active-tab" : ""}
                >
                  By Drivers
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={()=>{
                logoutManager()
              }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="tabs">
        {activeTab === "travellers" ? (
          <Traveller />
        ) : activeTab === "drivers" ? (
          <Drivers />
        ) : activeTab === "trips" ? (
          <Trips />
        ) : (
          "Nothing Selected"
        )}
      </Container>
    </div>
  );
}

export default TravellerManagerPage;
