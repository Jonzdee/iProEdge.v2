import { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";

const Shop = () => {
  const { products, loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    if (!loading) {
      setFilterList(products);
      setCategories(
        Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
      );
    }
  }, [products, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar py-4">
        <Container fluid  className="mt-5">
          <Row className="g-3 align-items-center">
            {/* FilterSelect */}
            <Col xs={12} md={4}>
              <FilterSelect
                setFilterList={setFilterList}
                products={products}
                categories={categories}
              />
            </Col>

            {/* SearchBar */}
            <Col xs={12} md={8}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>

        {/* Product List */}
        <Container fluid >
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
