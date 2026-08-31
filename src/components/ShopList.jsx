import { Container, Row, Col } from "react-bootstrap";
import { memo } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  if (!productItems || productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <section className="shop-lis">
      <Container fluid className="p-0">
        <Row className="m-0 p-0" style={{ "--bs-gutter-x": "0" }}>
          {productItems.map((productItem) => (
            <Col
              key={productItem.id}
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={2}
              className="p-0 shop-list-col"
            >
              <ProductCard title={null} productItem={productItem} />
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        /* Prevent ProductCard (or its image) from having a fixed/min width
           that's wider than a 50%-width mobile column — that's what breaks
           "2 per row" visually even when the Bootstrap column math is right.
           !important is needed here because a hardcoded inline style like
           <Card style={{ width: "18rem" }}> — a very common Bootstrap
           default — otherwise beats a normal stylesheet rule outright. */
        .shop-list-col {
          min-width: 0;
        }

        .shop-list-col > * {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box;
        }

        .shop-list-col .card {
          width: 100% !important;
          max-width: 100% !important;
        }

        .shop-list-col img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </section>
  );
};

export default memo(ShopList);