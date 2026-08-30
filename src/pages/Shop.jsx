import { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ProductFilter from "../components/ProductFilter";  // ✅ Use real filter
import SearchBar from "../components/SeachBar/SearchBar";

const Shop = () => {
  const { products, loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    group: null,
    brand: null,
    type: null
  });

  useWindowScrollToTop();

  // ✅ Apply filters dynamically
  useEffect(() => {
    if (!loading) {
      let filtered = products;

      if (activeFilter.group) {
        filtered = filtered.filter(p => p.category === activeFilter.group);
      }
      if (activeFilter.brand) {
        filtered = filtered.filter(p => p.brand === activeFilter.brand);
      }
      if (activeFilter.type) {
        filtered = filtered.filter(p => p.productType === activeFilter.type);
      }

      setFilterList(filtered);
    }
  }, [products, loading, activeFilter]);

  const handleFilterChange = (filterState) => {
    setActiveFilter(filterState);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar py-4">
        <Container fluid className="mt-5">
          <Row className="g-3">
            {/* ProductFilter Sidebar */}
            <Col xs={12} md={3}>
              <ProductFilter 
                products={products} 
                onFilterChange={handleFilterChange}
              />
            </Col>

            {/* SearchBar */}
            <Col xs={12} md={9}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>

        {/* Product List */}
        <Container fluid>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;