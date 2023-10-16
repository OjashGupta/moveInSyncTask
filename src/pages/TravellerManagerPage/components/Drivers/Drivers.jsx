import { useEffect, useState } from "react";
import { fetchAllDrivers } from "../../../../services/APIService";
import { Card, Container, ListGroup } from "react-bootstrap";
import "./Drivers.css"


function Drivers() {
  const [drivers, setDrivers] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllDrivers();
        console.log("in drivers ", res.data["data"]);
        if (res) {
          setDrivers(res.data["data"]);
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
      {drivers ? (
        drivers?.length !== 0 ? (
          <ListGroup>
            {drivers.map((item, index) => {
              return (
                <Card key={index} className="list_item">
                  <Card.Body className="c-card-body">
                    <Card.Text>
                      {item.firstName} {item.lastName}: {item.email}
                    </Card.Text>
                    <div className="star-rating">
                      {renderStars(item.rating)}
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
