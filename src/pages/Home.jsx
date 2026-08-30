import { useEffect, useState, Fragment, useRef } from "react";
import { gsap } from "gsap";
import Section from "../components/Section";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ReferralAd from "../components/ReferralAd";
import ProductFilter from "../components/ProductFilter";
import CategoryShowcase from "../components/CategoryShowcase/CategoryShowcase";
import { CATEGORY_HIERARCHY } from "../utils/categories";
import "animate.css";

// ── Trust strip content: the stuff Nigerian buyers actually check for
// before they trust an online electronics store ──
const TRUST_MARKS = [
  { icon: "bi-truck", label: "Pay on Delivery — Lagos" },
  { icon: "bi-patch-check-fill", label: "100% Genuine, Verified Stock" },
  { icon: "bi-shield-check", label: "Warranty on Every Device" },
  { icon: "bi-lightning-charge-fill", label: "Same-Day Dispatch" },
  { icon: "bi-headset", label: "Real Human Support" },
];

const Home = () => {
  const { products = [], loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ── Filter state: group (category), brand, type (productType) ──
  const [activeFilter, setActiveFilter] = useState({
    group: null,
    brand: null,
    type: null,
  });

  const filterNavRef = useRef(null);
  const heroRef = useRef(null);
  const categorySectionRef = useRef(null);
  const cardsRefs = useRef([]);
  cardsRefs.current = [];

  useWindowScrollToTop();

  // ── GSAP: Category section entrance ──
  useEffect(() => {
    if (!loading && categorySectionRef.current) {
      gsap.fromTo(
        categorySectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [loading]);

  // ── GSAP: Filter nav entrance ──
  useEffect(() => {
    if (!loading && filterNavRef.current) {
      gsap.fromTo(
        filterNavRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [loading]);

  // ── GSAP: Hero section animation ──
  useEffect(() => {
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll(".hero-text, .hero-btn, .hero-tag");
      if (heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { y: 80, opacity: 0, skewY: 8 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.12, ease: "power4.out" }
        );
      }
    }
  }, []);

  // ── GSAP: Product cards entrance on filter change ──
  useEffect(() => {
    if (cardsRefs.current.length > 0) {
      gsap.fromTo(
        cardsRefs.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "expo.out" }
      );
    }
  }, [filterList]);

  const addToCardsRefs = (el) => {
    if (el && !cardsRefs.current.includes(el)) {
      cardsRefs.current.push(el);
    }
  };

  // ── Sort helper ──
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
        return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  };

  // ── Main filter effect: Apply all filters + search + sort ──
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
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter((p) =>
        (p.productName && p.productName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.productType && p.productType.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

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
        .filter((item) => item.productName?.toLowerCase().includes(value.toLowerCase()))
        .map((item) => item.productName)
        .slice(0, 6);
      setSuggestions([...new Set(matched)]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      // Box is empty again — clear the active search so the hero (and
      // featured sections) come back without needing the Clear button.
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchValue(name);
    setShowSuggestions(false);
    setSearchQuery(name);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveFilter({ group: categoryId, brand: null, type: null });
    setSearchValue("");
    setSearchQuery("");
    setTimeout(() => {
      filterNavRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const clearAll = () => {
    setActiveFilter({ group: null, brand: null, type: null });
    setSearchValue("");
    setSearchQuery("");
  };

  const hasActiveFilter =
    activeFilter.group || activeFilter.brand || activeFilter.type || searchQuery;

  // ── Product sections by labels ──
  const discountProducts = products.filter(
    (p) => Array.isArray(p.labels) && p.labels.includes("bigDiscount")
  );
  const newArrivalData = products.filter(
    (p) => Array.isArray(p.labels) && p.labels.includes("newArrivals")
  );
  const bestSales = products.filter(
    (p) =>
      !discountProducts.includes(p) &&
      !newArrivalData.includes(p) &&
      Array.isArray(p.labels) &&
      p.labels.includes("bestSales")
  );

  const sectionTitle = () => {
    if (activeFilter.type) return activeFilter.type;
    if (activeFilter.brand) {
      const labels = {
        iphone: "iPhone",
        samsung: "Samsung",
        tablets: "Tablets",
        accessories: "Accessories",
        dahua: "Dahua",
        hikvision: "Hikvision",
        solar: "Solar Cameras",
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
      {/* ─── TRUST TICKER ─── the strip Naija buyers scan before they trust a store ─── */}
      <div className="trust-ticker">
        <div className="trust-ticker-track">
          {[...TRUST_MARKS, ...TRUST_MARKS].map((mark, i) => (
            <span className="trust-item" key={i}>
              <i className={`bi ${mark.icon}`} />
              {mark.label}
            </span>
          ))}
        </div>
      </div>

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      {!hasActiveFilter && (
        <section ref={heroRef} className="hero-section">
          <div className="hero-noise" />
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-12 col-lg-7">
                <span className="hero-tag">
                  <i className="bi bi-geo-alt-fill me-1" /> Serving Lagos &amp; Nationwide Delivery
                </span>
                <h1 className="hero-text display-3 mb-4">
                  Original Tech.
                  <br />
                  <span className="hero-accent">Real Naija Prices.</span>
                </h1>
                <p className="hero-text lead mb-4">
                  Phones, tablets, and security cameras — sourced genuine, tested before
                  dispatch, backed by warranty. No wahala.
                </p>
                <div className="hero-btn-row">
                  <button
                    className="hero-btn btn-market"
                    onClick={() =>
                      setActiveFilter({ group: "phones-tablets", brand: null, type: null })
                    }
                  >
                    <i className="bi bi-shop me-2" />
                    Shop Phones &amp; Tablets
                  </button>
                  <button
                    className="hero-btn btn-market-ghost"
                    onClick={() =>
                      setActiveFilter({ group: "electronics", brand: null, type: null })
                    }
                  >
                    Browse Security Cameras
                    <i className="bi bi-arrow-right ms-2" />
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-5 d-none d-lg-block">
                <div className="hero-tag-card">
                  <div className="hero-tag-card-row">
                    <i className="bi bi-phone-fill" />
                    <span>Verified Genuine</span>
                  </div>
                  <div className="hero-tag-card-price">₦ Fair Market Price</div>
                  <div className="hero-tag-card-row muted">
                    <i className="bi bi-shield-check" />
                    <span>Warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORY SHOWCASE ──────────────────────────────────────────── */}
      {!hasActiveFilter && (
        <div ref={categorySectionRef}>
          <CategoryShowcase
            categories={CATEGORY_HIERARCHY}
            onCategoryClick={handleCategoryClick}
            isLoading={loading}
          />
        </div>
      )}

      {/* ─── FEATURED SECTIONS (only show when not filtering) ───────────── */}
      {/* Moved above the full catalog grid: curated picks are what earn the
          scroll — an undifferentiated "All Products" wall shouldn't be the
          first thing a browsing (non-searching) visitor hits. */}
      {!hasActiveFilter && !loading && (
        <>
          {discountProducts.length > 0 && (
            <Section
              title="🔥 Flash Deals — Big Discounts"
              bgColor="#FFF4E8"
              productItems={discountProducts.slice(0, 8)}
            />
          )}

          {newArrivalData.length > 0 && (
            <Section
              title="✨ Just Landed"
              bgColor="#F0FAF5"
              productItems={newArrivalData.slice(0, 8)}
            />
          )}

          {bestSales.length > 0 && (
            <Section
              title="⭐ Customer Favourites"
              bgColor="#FBF9F4"
              productItems={bestSales.slice(0, 8)}
            />
          )}
        </>
      )}

      {/* ─── FILTER & SEARCH BAR ──────────────────────────────────────────── */}
      <div ref={filterNavRef} className="filter-navigation sticky-top py-3">
        <div className="container">
          <form
            className="filter-bar d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative py-2"
            onSubmit={handleSearch}
          >
            <div
              className="filter-search flex-grow-1 me-3 d-flex align-items-center"
              style={{ position: "relative", minWidth: 0 }}
            >
              <input
                type="text"
                className="form-control filter-search-input"
                placeholder="Search phones, tablets, cameras..."
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e);
                    setShowSuggestions(false);
                  }
                  if (e.key === "Escape") setShowSuggestions(false);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                autoComplete="off"
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="autocomplete-dropdown">
                  {suggestions.map((name, i) => (
                    <li
                      key={i}
                      onMouseDown={() => handleSuggestionClick(name)}
                      className="autocomplete-item"
                    >
                      <i className="bi bi-search text-muted me-2" style={{ fontSize: 12 }} />
                      {name}
                    </li>
                  ))}
                </ul>
              )}

              <button className="btn-market-sm ms-2" id="search-button" type="submit">
                <i className="bi bi-search" />
                <span className="ms-1  d-sm-inline">Search</span>
              </button>
            </div>

            <div className="sort-dropdown me-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {hasActiveFilter && (
              <button className="clear-btn" type="button" onClick={clearAll}>
                <i className="bi bi-x-lg me-1" /> Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {/* ─── MAIN LAYOUT: SIDEBAR + PRODUCTS ────────────────────────────── */}
      <div className="container-fluid py-4">
        <div className="row g-4">
          <div className="col-12 col-md-3 col-lg-2">
            <ProductFilter
              products={products}
              onFilterChange={(filter) => {
                setActiveFilter({
                  group: filter.group,
                  brand: filter.brand,
                  type: filter.type,
                });
                setSearchValue("");
                setSearchQuery("");
              }}
            />
          </div>

          <div className="col-12 col-md-9 col-lg-10">
            {!hasActiveFilter && !loading && (
              <div className="catalog-heading">
                <h2>Browse Everything In Stock</h2>
                <p>Or use the filters on the left to narrow it down.</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-5">
                <div className="market-spinner" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 loading-copy">Checking current stock...</p>
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
                <i className="bi bi-search" />
                <h3 className="mt-3">Nothing matches that search</h3>
                <p className="text-muted">
                  Try a different category, brand, or spelling — or clear filters to see
                  everything in stock.
                </p>
                <button className="btn-market" onClick={clearAll}>
                  <i className="bi bi-arrow-left me-2" />
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── REFERRAL SECTION ──────────────────────────────────────────── */}
      <ReferralAd />

      {/* ─── STYLES ────────────────────────────────────────────────────── */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap");

        :root {
          --ink: #14171f;
          --paper: #f6f5f1;
          --sky: #2f86d6;
          --sky-deep: #1b5fa6;
          --sky-tint: #eaf4fc;
          --gold: #f2a93b;
          --clay: #e8552b;
          --line: rgba(20, 23, 31, 0.1);
        }

        /* ── Trust ticker: LED-signage nod to Computer Village storefronts ── */
        .trust-ticker {
          background: var(--sky-deep);
          overflow: hidden;
          white-space: nowrap;
          padding: 0.5rem 0;
        }

        .trust-ticker-track {
          display: inline-flex;
          animation: scroll-ticker 28s linear infinite;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #fdfcf9;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 0 2rem;
          border-right: 1px solid rgba(253, 252, 249, 0.2);
        }

        .trust-item i {
          color: var(--gold);
        }

        @keyframes scroll-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-ticker-track { animation: none; }
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          background: linear-gradient(160deg, #ffffff 0%, var(--sky-tint) 55%, #dcecfa 100%);
          padding: 4.5rem 0 5rem;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            135deg,
            rgba(27, 95, 166, 0.025) 0px,
            rgba(27, 95, 166, 0.025) 1px,
            transparent 1px,
            transparent 10px
          );
          pointer-events: none;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          color: var(--sky-deep);
          border: 1px solid rgba(47, 134, 214, 0.3);
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(27, 95, 166, 0.08);
        }

        .hero-text {
          font-family: "Sora", sans-serif;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        h1.hero-text {
          font-weight: 800;
          line-height: 1.05;
        }

        .hero-accent {
          color: var(--sky-deep);
        }

        p.hero-text {
          font-family: "Inter", sans-serif;
          color: #475569;
          max-width: 46ch;
        }

        .hero-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
        }

        .btn-market,
        .btn-market-ghost,
        .btn-market-sm {
          font-family: "Sora", sans-serif;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .btn-market {
          background: var(--sky);
          color: #fff;
          padding: 0.85rem 1.6rem;
        }

        .btn-market:hover {
          background: var(--sky-deep);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(47, 134, 214, 0.28);
        }

        .btn-market-ghost {
          background: transparent;
          color: var(--sky-deep);
          border: 1px solid rgba(27, 95, 166, 0.3);
          padding: 0.85rem 1.6rem;
        }

        .btn-market-ghost:hover {
          background: #ffffff;
          transform: translateY(-2px);
        }

        .btn-market-sm {
          background: var(--sky);
          color: #fff;
          padding: 0.5rem 1.1rem;
          display: inline-flex;
          align-items: center;
        }

        .btn-market-sm:hover {
          background: var(--sky-deep);
        }

        /* ── Hero price-tag card: styled like a real tagged price sticker ── */
        .hero-tag-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.75rem;
          transform: rotate(2deg);
          box-shadow: 0 24px 48px rgba(27, 95, 166, 0.18);
          font-family: "JetBrains Mono", monospace;
          border: 1px solid var(--line);
        }

        .hero-tag-card-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--ink);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .hero-tag-card-row i {
          color: var(--sky-deep);
        }

        .hero-tag-card-row.muted {
          color: #6b7280;
          font-weight: 500;
        }

        .hero-tag-card-price {
          font-family: "Sora", sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--sky-deep);
          padding: 0.6rem 0;
          border-top: 1px dashed var(--line);
          border-bottom: 1px dashed var(--line);
          margin-bottom: 0.75rem;
        }

        /* ── Filter bar ── */
        .filter-navigation {
          background: rgba(246, 245, 241, 0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          z-index: 99;
        }

        .filter-bar {
          border: none;
        }

        .filter-search {
          min-width: 0;
        }

        .filter-search-input {
          /* Bootstrap's .form-control sets width:100%, which inside this
             flex row fights the search button for space and pushes it
             off-screen on narrow viewports. Constrain it explicitly. */
          flex: 1 1 auto;
          min-width: 0;
          width: auto;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: #fff;
          font-family: "Inter", sans-serif;
        }

        .filter-search-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(47, 134, 214, 0.15);
        }

        .sort-dropdown select {
          border-radius: 10px;
          background: #fff;
          border: 1px solid var(--line);
          font-family: "Inter", sans-serif;
        }

        .sort-dropdown select:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(47, 134, 214, 0.15);
        }

        .clear-btn {
          border-radius: 10px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          padding: 0.5rem 1.1rem;
          background: transparent;
          border: 1px solid var(--clay);
          color: var(--clay);
          transition: all 0.15s ease;
        }

        .clear-btn:hover {
          background: var(--clay);
          color: #fff;
        }

        /* Autocomplete */
        .autocomplete-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 90px;
          z-index: 1001;
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

        .autocomplete-item {
          padding: 9px 16px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }

        .autocomplete-item:hover {
          background: rgba(47, 134, 214, 0.08);
        }

        /* Catalog section heading (only shown in browse-all mode) */
        .catalog-heading {
          margin-bottom: 1.25rem;
        }

        .catalog-heading h2 {
          font-family: "Sora", sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }

        .catalog-heading p {
          font-family: "Inter", sans-serif;
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Loading */
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
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          color: #6b7280;
        }

        /* No Products Message */
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

        /* Responsive */
        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0 !important;
          }

          .filter-search,
          .sort-dropdown,
          .clear-btn {
            width: 100%;
          }

          .btn-market-sm {
            flex: 0 0 auto;
          }

          .hero-section {
            text-align: left;
            padding: 3rem 0 3.5rem;
          }

          h1.hero-text {
            font-size: 2.1rem;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Home;