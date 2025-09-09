import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container fluid>
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <Row className="g-3">
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
