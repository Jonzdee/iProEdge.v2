import { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Offcanvas, Badge } from "react-bootstrap";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ProductFilter from "../components/ProductFilter"; // ✅ Use real filter
import SearchBar from "../components/SeachBar/SearchBar";

const Shop = () => {
  const { products, loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    group: null,
    brand: null,
    type: null,
  });

  // ── Mobile filter drawer state ──
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useWindowScrollToTop();

  // ✅ Apply filters dynamically
  useEffect(() => {
    if (!loading) {
      let filtered = products;

      if (activeFilter.group) {
        filtered = filtered.filter((p) => p.category === activeFilter.group);
      }
      if (activeFilter.brand) {
        filtered = filtered.filter((p) => p.brand === activeFilter.brand);
      }
      if (activeFilter.type) {
        filtered = filtered.filter((p) => p.productType === activeFilter.type);
      }

      setFilterList(filtered);
    }
  }, [products, loading, activeFilter]);

  const handleFilterChange = (filterState) => {
    setActiveFilter(filterState);
  };

  const activeFilterCount = [
    activeFilter.group,
    activeFilter.brand,
    activeFilter.type,
  ].filter(Boolean).length;

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar py-3 py-md-4">
        <Container fluid className="px-3 px-md-4 mt-3 mt-md-5">
          <Row className="g-3">
            {/* ── Desktop: persistent sidebar ── */}
            <Col md={3} className="d-none d-md-block">
              <ProductFilter products={products} onFilterChange={handleFilterChange} />
            </Col>

            <Col xs={12} md={9}>
              {/* ── Mobile: search bar + filter toggle side by side ── */}
              <div className="d-flex d-md-block gap-2 mb-3 mb-md-0 shop-toolbar">
                <div className="flex-grow-1">
                  <SearchBar setFilterList={setFilterList} products={products} />
                </div>

                <button
                  type="button"
                  className="mobile-filter-btn d-md-none"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <i className="bi bi-funnel-fill" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge bg="light" text="dark" className="mobile-filter-count">
                      {activeFilterCount}
                    </Badge>
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* ── Mobile filter drawer ── */}
        <Offcanvas
          show={showMobileFilters}
          onHide={() => setShowMobileFilters(false)}
          placement="bottom"
          className="mobile-filter-drawer d-md-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ProductFilter products={products} onFilterChange={handleFilterChange} />
            <button
              type="button"
              className="mobile-filter-apply"
              onClick={() => setShowMobileFilters(false)}
            >
              Show {filterList.length} Result{filterList.length === 1 ? "" : "s"}
            </button>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Product List */}
        <Container fluid className="px-3 px-md-4">
          <ShopList productItems={filterList} />
        </Container>
      </section>

      <style>{`
        .mobile-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          background: #2f86d6;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0 0.9rem;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .mobile-filter-count {
          font-size: 0.7rem;
          font-weight: 700;
        }

        .mobile-filter-drawer {
          max-height: 85vh;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .mobile-filter-apply {
          width: 100%;
          margin-top: 1rem;
          background: #2f86d6;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.75rem;
          font-weight: 700;
          position: sticky;
          bottom: 0;
        }

        /* Keep the search input from squashing to nothing next to the
           Filters button on very narrow screens */
        .shop-toolbar > div:first-child {
          min-width: 0;
        }

        @media (max-width: 767px) {
          .filter-bar {
            padding-top: 0;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Shop;