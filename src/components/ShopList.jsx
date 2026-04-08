import { Container, Row, Col } from "react-bootstrap";
import { memo } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  if (!productItems || productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <section className="shop-list">
      <Container fluid className="p-0">
        <Row className="m-0 p-0" style={{ "--bs-gutter-x": "0" }}>
          {productItems.map((productItem) => (
            <Col
              key={productItem.id}
              xs={6}   // ✅ forces 2 per row on mobile
              sm={4}
              md={3}
              lg={3}
              xl={2}
              className="p-0"  // ✅ removes col padding
            >
              <ProductCard title={null} productItem={productItem} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default memo(ShopList);
