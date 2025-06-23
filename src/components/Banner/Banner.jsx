import { Col, Container, Row } from "react-bootstrap";
import bannerImage from '../../Images/speaker2.webp'
import "./banner.css";
const Banner = ({ title}) => {
    
  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
        position: "relative"
      }}
    >
      <div className="overlay">
        <Container>
          <Row>
            <Col>
              <h2>{title}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;