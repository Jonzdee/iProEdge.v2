import { Row, Col } from "react-bootstrap";
import { memo } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  if (!productItems || productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <div className="shop-list-wrapper">
  <Row className="gy-3">
    {productItems.map((productItem) => (
      <Col key={productItem.id} xs={6} sm={4} md={3} lg={3} xl={2}>
        <ProductCard title={null} productItem={productItem} />
      </Col>
    ))}
  </Row>
</div>

  );
};

export default memo(ShopList);
