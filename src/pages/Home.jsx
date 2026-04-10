import { useEffect, useState, Fragment, useRef } from "react";
import { gsap } from "gsap";
import Section from "../components/Section";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ReferralAd from "../components/ReferralAd";
import ProductFilter from "../components/ProductFilter"; // ← new import
import "animate.css";

const Home = () => {
  const { products = [], loading } = useSanityProducts();
  const [filterList, setFilterList]     = useState([]);
  const [searchValue, setSearchValue]   = useState("");
  const [searchQuery, setSearchQuery]   = useState("");
  const [sortBy, setSortBy]             = useState("newest");
  const [suggestions, setSuggestions]   = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ── NEW: 3-level filter state ──
  const [activeFilter, setActiveFilter] = useState({
    group: null,
    brand: null,
    type: null,
  });

  const filterNavRef  = useRef(null);
  const heroRef       = useRef();
  const cardsRefs     = useRef([]);
  cardsRefs.current   = [];

  useWindowScrollToTop();

  // ── GSAP: nav entrance ──
  useEffect(() => {
    if (!loading && filterNavRef.current) {
      gsap.fromTo(
          filterNavRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [loading]);

  // ── GSAP: hero ──
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-text"),
          { y: 80, opacity: 0, skewY: 8 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
      );
    }
  }, []);

  // ── GSAP: cards on filter change ──
  useEffect(() => {
    if (cardsRefs.current.length) {
      gsap.fromTo(
          cardsRefs.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "expo.out" }
      );
    }
  }, [filterList]);

  const addToCardsRefs = (el) => {
    if (el && !cardsRefs.current.includes(el)) cardsRefs.current.push(el);
  };

  // ── Sort helper ──
  const sortProducts = (list, sortType) => {
    const sorted = [...list];
    switch (sortType) {
      case "priceLowHigh":  return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "priceHighLow":  return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "popular":       return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      default:              return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  };

  // ── Main filter effect ──
  useEffect(() => {
    let base = [...products];

    // 1. Group filter (category)
    if (activeFilter.group) {
      base = base.filter(p => p.category === activeFilter.group);
    }

    // 2. Brand filter
    if (activeFilter.brand) {
      base = base.filter(p => p.brand === activeFilter.brand);
    }

    // 3. Product type filter
    if (activeFilter.type) {
      base = base.filter(p => p.productType === activeFilter.type);
    }

    // 4. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(p =>
          (p.productName   && p.productName.toLowerCase().includes(q)) ||
          (p.brand         && p.brand.toLowerCase().includes(q))       ||
          (p.productType   && p.productType.toLowerCase().includes(q)) ||
          (p.category      && p.category.toLowerCase().includes(q))
      );
    }

    // 5. Sort
    setFilterList(sortProducts(base, sortBy));
  }, [products, activeFilter, searchQuery, sortBy]);

  // ── Search handlers ──
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    setShowSuggestions(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim().length > 0) {
      const matched = products
          .filter(item => item.productName?.toLowerCase().includes(value.toLowerCase()))
          .map(item => item.productName)
          .slice(0, 6);
      setSuggestions([...new Set(matched)]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchValue(name);
    setShowSuggestions(false);
    setSearchQuery(name);
  };

  const clearAll = () => {
    setActiveFilter({ group: null, brand: null, type: null });
    setSearchValue("");
    setSearchQuery("");
  };

  const hasActiveFilter =
      activeFilter.group || activeFilter.brand || activeFilter.type || searchQuery;

  // ── Sectioned product lists ──
  const discountProducts = products.filter(p => Array.isArray(p.labels) && p.labels.includes("bigDiscount"));
  const newArrivalData   = products.filter(p => Array.isArray(p.labels) && p.labels.includes("newArrivals"));
  const bestSales        = products.filter(
      p => !discountProducts.includes(p) && !newArrivalData.includes(p) &&
          Array.isArray(p.labels) && p.labels.includes("bestSales")
  );

  // ── Active section title ──
  const sectionTitle = () => {
    if (activeFilter.type)  return activeFilter.type;
    if (activeFilter.brand) {
      const labels = {
        iphone: "iPhone", samsung: "Samsung", tablets: "Tablets",
        accessories: "Accessories", dahua: "Dahua", hikvision: "Hikvision", solar: "Solar Cameras",
      };
      return labels[activeFilter.brand] || activeFilter.brand.toLowerCase();
    }
    if (activeFilter.group) {
      return activeFilter.group === "phones-tablets" ? "Phones & Tablets" : "Electronics";
    }
    return "All Products";
  };

  return (
      <Fragment>

        {/* ── Top bar: search + sort ── */}
        <div ref={filterNavRef} className="filter-navigation glassy-bg sticky-top py-3">
          <div className="container">
            <form
                className="filter-bar d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative py-3"
                onSubmit={handleSearch}
            >
              {/* Search */}
              <div className="filter-search flex-grow-1 me-3 d-flex align-items-center" style={{ position: "relative" }}>
                <input
                    type="text"
                    className="form-control filter-search-input"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { handleSearch(e); setShowSuggestions(false); }
                      if (e.key === "Escape") setShowSuggestions(false);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    autoComplete="off"
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="autocomplete-dropdown">
                      {suggestions.map((name, i) => (
                          <li key={i} onMouseDown={() => handleSuggestionClick(name)} className="autocomplete-item">
                            <i className="bi bi-search text-muted me-2" style={{ fontSize: 12 }} />
                            {name}
                          </li>
                      ))}
                    </ul>
                )}
                <button className="btn btn-primary ms-2" id="search-button" type="submit" style={{ whiteSpace: "nowrap" }}>
                  <i className="bi bi-search" />
                  <span className="ms-1">Search</span>
                </button>
              </div>

              {/* Sort */}
              <div className="sort-dropdown me-3">
                <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="newest">Sort: Newest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Clear */}
              {hasActiveFilter && (
                  <button className="btn btn-outline-danger clear-btn" type="button" onClick={clearAll}>
                    <i className="bi bi-x-lg me-1" /> Clear Filter
                  </button>
              )}
            </form>
          </div>
        </div>

        {/* ── Main layout: sidebar + products ── */}
        <div className="container-fluid py-4">
          <div className="row g-4">

            {/* Sidebar */}
            <div className="col-12 col-md-3 col-lg-2">
              <ProductFilter
                  products={products}
                  onFilterChange={(filter) => {
                    setActiveFilter(filter);
                    setSearchValue("");
                    setSearchQuery("");
                  }}
              />
            </div>

            {/* Product grid */}
            <div className="col-12 col-md-9 col-lg-10">
              {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading products...</p>
                  </div>
              )}

              {!loading && filterList.length > 0 && (
                  <Section
                      title={sectionTitle()}
                      bgColor="white"
                      productItems={filterList}
                      cardRef={addToCardsRefs}
                  />
              )}

              {!loading && filterList.length === 0 && (
                  <div className="no-products-message text-center py-5">
                    <i className="bi bi-search" style={{ fontSize: 48, color: "#cbd5e1" }} />
                    <h3 className="mt-3">No products found</h3>
                    <p className="text-muted">Try a different category or search term.</p>
                    <button className="btn btn-primary" onClick={clearAll}>
                      View All Products
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>

        <ReferralAd />

        <style jsx="true">{`
        :root {
          --glass: rgba(255,255,255,0.7);
        }
        .glassy-bg {
          background: var(--glass);
          backdrop-filter: blur(12px) saturate(120%);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .filter-bar {
          border-bottom: 1px solid #e3e8ee;
          border-radius: 1.5rem 1.5rem 0 0;
        }
        .filter-search-input {
          border-radius: 1rem;
          border: 1px solid #b7d0ff55;
          background: rgba(255,255,255,0.85);
        }
        #search-button {
          background: linear-gradient(45deg, #007bff, #0056b3) !important;
          border: none;
          border-radius: 999px;
          padding: 0.45em 1.3em;
          font-weight: 500;
          color: #fff;
        }
        .sort-dropdown select {
          border-radius: 1rem;
          background: rgba(255,255,255,0.85);
          border: 1px solid #b7d0ff55;
        }
        .clear-btn {
          border-radius: 999px;
          font-weight: 500;
          padding: 0.45em 1.3em;
        }
        /* Autocomplete */
        .autocomplete-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 90px;
          z-index: 1000;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          list-style: none;
          margin: 4px 0 0;
          padding: 4px 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          max-height: 220px;
          overflow-y: auto;
        }
        .autocomplete-item {
          padding: 9px 16px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        .autocomplete-item:hover { background: #f0f4ff; }
        /* No products */
        .no-products-message {
          background: #f6f9fc;
          border-radius: 18px;
          padding: 60px 15px;
        }
        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0 !important;
          }
          .filter-search, .sort-dropdown, .clear-btn { width: 100%; }
        }
      `}</style>
      </Fragment>
  );
};

export default Home;