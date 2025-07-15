import { Col, Container, Row } from "react-bootstrap";
import bannerImage from '../../Images/speaker2.webp'
import "./banner.css";

const Banner = ({ title, subtitle, height = "400px" }) => {
  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%), url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Parallax effect
        minHeight: height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="overlay">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="banner-content">
                <h1 className="banner-title">{title}</h1>
                {subtitle && <p className="banner-subtitle">{subtitle}</p>}
                <div className="banner-decoration">
                  <span className="decoration-line"></span>
                  <span className="decoration-dot"></span>
                  <span className="decoration-line"></span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Animated particles effect */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default Banner;