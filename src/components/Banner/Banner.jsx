import { Col, Container, Row } from "react-bootstrap";
import bannerImage from "../../Images/banner.jpg";
import "./banner.css";

const Banner = ({ title, subtitle }) => {
  return (
    <div className="image-container" >
      {/* Actual responsive image */}
      <img
        src={bannerImage}
        alt="Banner"
        className="banner-img"
        
      />

      {/* Overlay content */}
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

      {/* Optional particles */}
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
