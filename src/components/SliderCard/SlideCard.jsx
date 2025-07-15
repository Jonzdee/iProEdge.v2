import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./slidercard.css";

const SlideCard = ({ title, desc, cover, buttonText = "Shop Our Products ", reversed = false, linkTo = "/shop" }) => {
  return (
    <Container className='slide-card-container'>
      <div className="slide-card-box">
        <Row className={`align-items-center ${reversed ? 'flex-row-reverse' : ''}`}>
          <Col md={6} className="slide-card-content">
            <div className="content-wrapper">
              <div className="title-wrapper">
                <h1 className="slide-card-title">{title}</h1>
                <div className="title-underline"></div>
              </div>
              <p className="slide-card-description">{desc}</p>
              <Link to={linkTo} className='slide-card-btn'>
                <span className="btn-text">{buttonText}</span>
                <div className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </Col>
          <Col md={6} className="slide-card-image">
            <div className="image-wrapper">
              <div className="image-overlay"></div>
              <img src={cover} alt={title || "Product"} className="card-image" />
              <div className="image-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default SlideCard