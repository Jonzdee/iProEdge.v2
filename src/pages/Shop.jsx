import { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Offcanvas, Badge } from "react-bootstrap";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ProductFilter from "../components/ProductFilter";
import {
  getCategoryLabel,
  getBrandLabel,
  getProductTypeLabel,
} from "../utils/categories";

const Shop = () => {
  const { products = [], loading } = useSanityProducts();

  const [filterList, setFilterList] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [activeFilter, setActiveFilter] = useState({
    group: null,
    brand: null,
    type: null,
    priceRange: null,
    minRating: null,
    inStock: false,
    minDiscount: null,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useWindowScrollToTop();

  const sortProducts = (list, sortType) => {
    const sorted = [...list];
    switch (sortType) {
      case "priceLowHigh":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "priceHighLow":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "popular":
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
    }
  };

  useEffect(() => {
    let base = [...products];

    if (activeFilter.group) {
      base = base.filter((p) => p.category === activeFilter.group);
    }
    if (activeFilter.brand) {
      base = base.filter((p) => p.brand === activeFilter.brand);
    }
    if (activeFilter.type) {
      base = base.filter((p) => p.productType === activeFilter.type);
    }
    if (activeFilter.priceRange) {
      const { min, max } = activeFilter.priceRange;
      base = base.filter((p) => {
        const price = p.price || 0;
        return price >= min && price <= max;
      });
    }
    if (activeFilter.minRating) {
      base = base.filter((p) => (p.avgRating || 0) >= activeFilter.minRating);
    }
    if (activeFilter.inStock) {
      base = base.filter((p) => p.inStock === true);
    }
    if (activeFilter.minDiscount) {
      base = base.filter((p) => (p.discount || 0) >= activeFilter.minDiscount);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (p) =>
          (p.productName && p.productName.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.productType && p.productType.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)),
      );
    }

    setFilterList(sortProducts(base, sortBy));
  }, [products, activeFilter, searchQuery, sortBy]);

  const handleFilterChange = (filterState) => {
    setActiveFilter({
      group: filterState.group ?? null,
      brand: filterState.brand ?? null,
      type: filterState.type ?? null,
      priceRange: filterState.priceRange ?? null,
      minRating: filterState.minRating ?? null,
      inStock: filterState.inStock ?? false,
      minDiscount: filterState.minDiscount ?? null,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim().length > 0) {
      const matched = products
        .filter((item) =>
          item.productName?.toLowerCase().includes(value.toLowerCase()),
        )
        .map((item) => item.productName)
        .slice(0, 6);
      setSuggestions([...new Set(matched)]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (name) => {
    setSearchValue(name);
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  const clearAll = () => {
    setActiveFilter({
      group: null,
      brand: null,
      type: null,
      priceRange: null,
      minRating: null,
      inStock: false,
      minDiscount: null,
    });
    setSearchValue("");
    setSearchQuery("");
  };

  const hasActiveFilter =
    activeFilter.group ||
    activeFilter.brand ||
    activeFilter.type ||
    activeFilter.priceRange ||
    activeFilter.minRating ||
    activeFilter.inStock ||
    activeFilter.minDiscount ||
    searchQuery;

  const activeFilterCount = [
    activeFilter.group,
    activeFilter.brand,
    activeFilter.type,
    activeFilter.priceRange,
    activeFilter.minRating,
    activeFilter.inStock ? true : null,
    activeFilter.minDiscount,
  ].filter(Boolean).length;

  const sectionTitle = () => {
    if (activeFilter.type) return getProductTypeLabel(activeFilter.type);
    if (activeFilter.brand) return getBrandLabel(activeFilter.brand);
    if (activeFilter.group) return getCategoryLabel(activeFilter.group);
    return "All Products";
  };

  return (
    <Fragment>
      <Banner title="Products" />

      <section className="filter-bar py-3 py-md-4">
        <Container fluid className="px-3 px-md-4 mt-3 mt-md-5">
          <Row className="g-3">
            {/* ── Desktop: persistent sidebar ── */}
            <Col md={3} className="d-none d-md-block">
              <ProductFilter
                products={products}
                onFilterChange={handleFilterChange}
              />
            </Col>

            {/* ── Everything for the product area — toolbar, heading, AND
                the product list itself — now lives inside this one column,
                so the grid starts right beside the filter sidebar instead
                of dropping to a separate full-width container below it. ── */}
            <Col xs={12} md={9}>
              <form
                className="d-flex gap-2 mb-3 shop-toolbar"
                onSubmit={handleSearchSubmit}
              >
                <div
                  className="shop-search flex-grow-1"
                  style={{ position: "relative", minWidth: 0 }}
                >
                  <input
                    type="text"
                    className="form-control shop-search-input"
                    placeholder="Search phones, tablets, cameras..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={(e) =>
                      e.key === "Escape" && setShowSuggestions(false)
                    }
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 150)
                    }
                    onFocus={() =>
                      suggestions.length > 0 && setShowSuggestions(true)
                    }
                    autoComplete="off"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="shop-autocomplete">
                      {suggestions.map((name, i) => (
                        <li
                          key={i}
                          onMouseDown={() => handleSuggestionClick(name)}
                          className="shop-autocomplete-item"
                        >
                          <i
                            className="bi bi-search text-muted me-2"
                            style={{ fontSize: 12 }}
                          />
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <select
                  className="form-select shop-sort d-none d-md-block"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>

                <button
                  type="button"
                  className="mobile-filter-btn d-md-none"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <i className="bi bi-funnel-fill" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge
                      bg="light"
                      text="dark"
                      className="mobile-filter-count"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </button>
              </form>

              <div className="d-md-none mb-3">
                <select
                  className="form-select shop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <div className="d-flex align-items-center justify-content-between shop-heading">
                <div>
                  <h2>{sectionTitle()}</h2>
                  {!loading && (
                    <p className="text-muted mb-0">
                      {filterList.length} item
                      {filterList.length === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
                {hasActiveFilter && (
                  <button
                    className="clear-btn"
                    type="button"
                    onClick={clearAll}
                  >
                    <i className="bi bi-x-lg me-1" /> Clear
                  </button>
                )}
              </div>

              {/* ── Product list ── */}
              {loading && (
                <div className="text-center py-5">
                  <div className="market-spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 loading-copy">Checking current stock...</p>
                </div>
              )}

              {!loading && filterList.length > 0 && (
                <ShopList productItems={filterList} />
              )}

              {!loading && filterList.length === 0 && (
                <div className="no-products-message text-center py-5">
                  <i className="bi bi-search" />
                  <h3 className="mt-3">Nothing matches that search</h3>
                  <p className="text-muted">
                    Try a different category, brand, or spelling — or clear
                    filters to see everything in stock.
                  </p>
                  <button className="btn-market" onClick={clearAll}>
                    <i className="bi bi-arrow-left me-2" />
                    View All Products
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Container>

        {/* ── Mobile filter drawer — slides in from the side, like Home ── */}
        <Offcanvas
          show={showMobileFilters}
          onHide={() => setShowMobileFilters(false)}
          placement="end"
          className="mobile-filter-drawer d-md-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ProductFilter
              products={products}
              onFilterChange={handleFilterChange}
            />
            <button
              type="button"
              className="mobile-filter-apply"
              onClick={() => setShowMobileFilters(false)}
            >
              Show {filterList.length} Result
              {filterList.length === 1 ? "" : "s"}
            </button>
          </Offcanvas.Body>
        </Offcanvas>
      </section>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap");

        .filter-bar {
          --ink: #14171f;
          --paper: #f6f5f1;
          --sky: #2f86d6;
          --sky-deep: #1b5fa6;
          --clay: #e8552b;
          --line: rgba(20, 23, 31, 0.1);
        }

        .shop-toolbar {
          align-items: center;
        }

        .shop-search-input {
          border-radius: 10px;
          border: 1px solid var(--line);
          font-family: "Inter", sans-serif;
        }

        .shop-search-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(47, 134, 214, 0.15);
        }

        .shop-autocomplete {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 50;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          list-style: none;
          margin: 4px 0 0;
          padding: 4px 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          max-height: 220px;
          overflow-y: auto;
          font-family: "Inter", sans-serif;
        }

        .shop-autocomplete-item {
          padding: 9px 16px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
        }

        .shop-autocomplete-item:hover {
          background: rgba(47, 134, 214, 0.08);
        }

        .shop-sort {
          border-radius: 10px;
          border: 1px solid var(--line);
          font-family: "Inter", sans-serif;
          flex: 0 0 auto;
          max-width: 220px;
        }

        .shop-heading {
          margin-bottom: 1.25rem;
        }

        .shop-heading h2 {
          font-family: "Sora", sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--ink);
          margin-bottom: 0.15rem;
        }

        .clear-btn {
          border-radius: 10px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          padding: 0.5rem 1.1rem;
          background: transparent;
          border: 1px solid var(--clay);
          color: var(--clay);
        }

        .clear-btn:hover {
          background: var(--clay);
          color: #fff;
        }

        .mobile-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          background: #2f86d6;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 0 0.9rem;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .mobile-filter-count {
          font-size: 0.7rem;
          font-weight: 700;
        }

        /* Side drawer (placement="end") sizing — was previously a bottom sheet */
        .mobile-filter-drawer {
          width: min(85vw, 340px) !important;
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

        .market-spinner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid var(--line);
          border-top-color: var(--sky);
          margin: 0 auto;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-copy {
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .no-products-message {
          background: var(--paper);
          border-radius: 18px;
          padding: 60px 15px;
          font-family: "Inter", sans-serif;
        }

        .no-products-message i {
          font-size: 44px;
          color: #b8c2bc;
        }

        .no-products-message h3 {
          font-family: "Sora", sans-serif;
          font-weight: 700;
        }

        @media (max-width: 767px) {
          .filter-bar {
            padding-top: 0;
          }

          .shop-search {
            min-width: 0;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Shop;
