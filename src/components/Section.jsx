import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={bgColor ? { background: bgColor } : undefined}>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4">{title}</h1>
        </div>
        <Row className="gx-0 gy-3">
          {productItems.map((productItem) => (
            <Col key={productItem.id} xs={6} sm={4} md={3} lg={3} xl={2}>
              <ProductCard title={title} productItem={productItem} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
