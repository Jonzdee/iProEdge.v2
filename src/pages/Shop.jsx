import { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../../SeachBar/SearchBar";

const Shop = () => {
  const { products, loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    if (!loading) {
      setFilterList(products);
      // Extract unique, non-empty categories from products
      setCategories(
        Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
      );
    }
  }, [products, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect
                setFilterList={setFilterList}
                products={products}
                categories={categories}
              />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;