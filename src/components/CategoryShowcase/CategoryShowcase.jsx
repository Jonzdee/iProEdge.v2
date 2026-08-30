import { Container, Row, Col } from "react-bootstrap";
import "./category-showcase.css";

const CategoryShowcase = ({ categories, onCategoryClick, isLoading }) => {
  if (isLoading) {
    return null;
  }

  return (
    <section className="category-showcase py-5">
      <Container>
        {/* Section Header */}
        <div className="category-header text-center mb-5">
          <span className="category-eyebrow">Browse the Shop</span>
          <h2 className="category-title">Shop by Category</h2>
          <p className="category-subtitle">
            Genuine phones, tablets, and security cameras — sorted the way you'd browse them in
            store
          </p>
        </div>

        {/* Category Grid */}
        <Row className="g-4">
          {categories.map((category) => (
            <Col key={category.id} xs={6} sm={6} md={4} lg={3} className="d-flex">
              <div
                className="category-card w-100 cursor-pointer"
                onClick={() => onCategoryClick(category.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onCategoryClick(category.id);
                  }
                }}
              >
                {/* Icon Background */}
                <div className="category-icon-wrapper">
                  <i className={`bi ${category.icon} category-icon`} />
                </div>

                {/* Category Name */}
                <h3 className="category-name">{category.label}</h3>

                {/* Browse tag */}
                <div className="category-browse">
                  <span>Browse</span>
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryShowcase;