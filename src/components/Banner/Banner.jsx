import { Col, Container, Row } from "react-bootstrap";
;
import "./banner.css";
const Banner = ({title}) => {
    return ( 
        <div className="image-container">
          
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
}

export default Banner;