import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../../services/APIService";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Traveller() {
  const navigate = useNavigate();
  const [travellers, setTravellers] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllUsers();
        console.log("in travller ", res.data["data"]);
        if (res) {
          setTravellers(res.data["data"]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const navigateToFeedbacks = (user) => {
    localStorage.setItem("selected_user", JSON.stringify(user));
    navigate(`/all_feedbacks/${user.id}`);
  };

  return (
    <Container>
      {travellers ? (
        travellers?.length !== 0 ? (
          <ListGroup>
            {travellers.map((item, index) => {
              return (
                <Card key={index} className="list_item">
                  <Card.Body className="c-card-body">
                    <Card.Text>
                      {item.firstName} {item.lastName}: &nbsp;
                      <a
                        href=""
                        onClick={() => {
                          navigateToFeedbacks(item);
                        }}
                      >
                        {item.email}
                      </a>
                    </Card.Text>
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

export default Traveller;
