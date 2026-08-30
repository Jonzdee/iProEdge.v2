import { Container, Row, Col } from "react-bootstrap";
import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Watch,
  Video,
  Headphones,
  Laptop,
  Tag,
} from "lucide-react";
import "./category-showcase.css";

// Maps your actual Bootstrap Icon class names to Lucide components
const iconMap = {
  "bi-phone": Smartphone,
  "bi-bag": ShoppingBag,
  "bi-smartwatch": Watch,
  "bi-camera-video": Video,
  "bi-earbuds": Headphones,
  "bi-laptop": Laptop,
};

const getIcon = (icon) => {
  if (!icon) return Tag;
  if (typeof icon === "function") return icon;
  return iconMap[icon] || Tag;
};

const defaultCategories = [
  { id: 1, label: "Phones & Tablets", icon: "bi-phone", color: "#2f86d6" },
  { id: 2, label: "Phone Accessories", icon: "bi-bag", color: "#e0663f" },
  { id: 3, label: "Smart Watches", icon: "bi-smartwatch", color: "#7c5cbf" },
  { id: 4, label: "Electronics", icon: "bi-camera-video", color: "#2f9e6a" },
  { id: 5, label: "Audio", icon: "bi-earbuds", color: "#d6a72f" },
  { id: 6, label: "Computers", icon: "bi-laptop", color: "#c94f7c" },
];

const CategoryShowcase = ({
  categories = defaultCategories,
  onCategoryClick,
  isLoading,
}) => {
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
            Genuine phones, tablets, and security cameras — sorted the way you'd
            browse them in store
          </p>
        </div>

        {/* Category Grid / Slider */}
        <Row className="g-4 category-grid">
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <Col
                key={category.id}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                className="d-flex category-col"
              >
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
                  <div
                    className="category-icon-wrapper"
                    style={
                      category.color
                        ? { "--icon-color": category.color }
                        : undefined
                    }
                  >
                    <Icon className="category-icon" strokeWidth={1.75} />
                  </div>

                  {/* Category Name */}
                  <h3 className="category-name">{category.label}</h3>

                  {/* Browse tag */}
                  <div className="category-browse">
                    <span>Browse</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
