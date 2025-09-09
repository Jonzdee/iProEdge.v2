import { useEffect, useState, Fragment, useRef } from "react";
import { gsap } from "gsap";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSanityProducts } from "../hooks/useSanityProducts";
import ReferralAd from "../components/ReferralAd";
import "animate.css";

const Home = () => {
  const { products = [], loading } = useSanityProducts();
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState(""); // TRACK SEARCH INPUT
  const [searchQuery, setSearchQuery] = useState(""); // FOR BUTTON
  const [sortBy, setSortBy] = useState("newest"); // ADD SORT STATE
  const filterButtonsRef = useRef(null);
  const filterNavRef = useRef(null);
  const heroRef = useRef();
  const underlineRef = useRef();
  const cardsRefs = useRef([]);
  cardsRefs.current = [];

  useWindowScrollToTop();

  // Gather categories
  useEffect(() => {
    if (!loading) {
      setFilterList(products);
      const uniqueCategories = Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    }
  }, [products, loading]);

  // GSAP Animations: Hero Parallax + Text Reveal
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-text"),
        { y: 80, opacity: 0, skewY: 8 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        heroRef.current.querySelectorAll(".parallax"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.13,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // GSAP: Filter Buttons Entrance + Animated Underline
  useEffect(() => {
    if (!loading && filterButtonsRef.current) {
      const buttons = filterButtonsRef.current.querySelectorAll(".filter-btn");
      gsap.fromTo(
        buttons,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        filterNavRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [loading, categories]);

  // GSAP: Move underline on filter active
  useEffect(() => {
    const activeBtn =
      filterButtonsRef.current?.querySelector(".filter-btn.active");
    if (activeBtn && underlineRef.current) {
      gsap.to(underlineRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.4,
        ease: "expo.out",
      });
    }
  }, [activeFilter, categories]);

  // GSAP: Animate cards on filter change
  useEffect(() => {
    if (cardsRefs.current.length) {
      gsap.fromTo(
        cardsRefs.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "expo.out",
        }
      );
    }
  }, [filterList, activeFilter]);

  // Add product card ref for GSAP
  const addToCardsRefs = (el) => {
    if (el && !cardsRefs.current.includes(el)) cardsRefs.current.push(el);
  };

  // UPDATED SORT FUNCTION
  const sortProducts = (products, sortType) => {
    let sortedProducts = [...products];
    
    switch (sortType) {
      case 'priceLowHigh':
        sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'priceHighLow':
        sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popular':
        sortedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
      default:
        sortedProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }
    
    return sortedProducts;
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  // Filter change handler with ripple
  const handleFilterChange = (category, e) => {
    setActiveFilter(category);
    setSearchValue(""); // RESET SEARCH ON FILTER CHANGE
    setSearchQuery(""); // RESET SEARCH BUTTON
    
    // Button ripple effect
    if (e && e.target) {
      const circle = document.createElement("span");
      circle.className = "ripple";
      const rect = e.target.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;
      e.target.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    }
  };

  // --- SEARCH LOGIC ---
  // Run search on button click or Enter
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    // Optionally scroll to products section
    if (filterNavRef.current) {
      filterNavRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // UPDATED: Filtered Products with sorting applied
  useEffect(() => {
    let base = products;
    // 1. Filter by category
    if (activeFilter !== "all") {
      base = base.filter((item) => item.category === activeFilter);
    }
    // 2. If search is active, filter by search (name, brand, or category)
    if (searchQuery && searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      base = base.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(query)) ||
          (item.brand && item.brand.toLowerCase().includes(query)) ||
          (item.category && item.category.toLowerCase().includes(query))
      );
    }
    // 3. Apply sorting
    const sortedBase = sortProducts(base, sortBy);
    setFilterList(sortedBase);
  }, [products, activeFilter, searchQuery, sortBy]);

  // UPDATED: Sectioned product logic with sorting
 // Only products with the "bigDiscount" label will show here
const discountProducts = products.filter(
  (p) => Array.isArray(p.labels) && p.labels.includes("bigDiscount")
);

// New arrivals remain the same
const newArrivalData = products.filter(
  (p) =>
    Array.isArray(p.labels) && p.labels.includes("newArrivals")
);

// 3. Get Best Sales, excluding Discount & New Arrivals
const bestSales = products.filter(
  (p) =>
    !discountProducts.includes(p) &&
    !newArrivalData.includes(p) &&
    Array.isArray(p.labels) &&
    p.labels.includes("bestSales")
);


useEffect(() => {
  const showPopup = () => {
    const popup = document.getElementById("discount-popup");
    if (window.scrollY > 400 && popup && popup.style.display === "none") {
      popup.style.display = "block";
      setTimeout(() => {
        if (popup) popup.style.display = "none";
      }, 6000); // show for 6 seconds
    }
  };

  window.addEventListener("scroll", showPopup);
  return () => window.removeEventListener("scroll", showPopup);
}, []);

  return (
    <Fragment>
      <SliderHome />
      <ReferralAd />




      <div
        ref={filterNavRef}
        className="filter-navigation glassy-bg sticky-top py-5"
      >
        <div className="container">
          <form
            className="filter-bar d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative py-3"
            onSubmit={handleSearch}
          >
            {/* Search Bar */}
            <div className="filter-search flex-grow-1 me-3 d-flex align-items-center">
              <input
                type="text"
                className="form-control filter-search-input"
                placeholder="Search products, brands, or categories..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(e);
                }}
              />
              <button
                className="btn btn-primary ms-2"
                id="search-button"
                type="submit"
                style={{ whiteSpace: "nowrap" }}
                aria-label="Search"
              >
                <i className="bi bi-search"></i>
                <span className="ms-1">Search</span>
              </button>
            </div>

            {/* "Sort By" Dropdown */}
            <div className="sort-dropdown me-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Sort: Newest</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Clear Filter Button */}
            {(activeFilter !== "all" || searchQuery) && (
              <button
                className="btn btn-outline-danger clear-btn"
                type="button"
                onClick={(e) => {
                  handleFilterChange("all", e);
                  setSearchValue("");
                  setSearchQuery("");
                }}
              >
                <i className="bi bi-x-lg me-1"></i> Clear Filter
              </button>
            )}
          </form>

          {/* UPDATED: Filter buttons with flex-wrap for mobile */}
          <div
            className="filter-buttons d-flex flex-wrap justify-content-start gap-2 position-relative py-3"
            ref={filterButtonsRef}
            style={{ minHeight: 54 }}
          >
            <button
              className={`filter-btn ${
                activeFilter === "all"
                  ? "btn-primary active"
                  : "btn-outline-primary"
              }`}
              onClick={(e) => handleFilterChange("all", e)}
            >
              <span className="cat-icon">
                <i className="bi bi-grid"></i>
              </span>
              All Products
              <span className="cat-badge">{products.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${
                  activeFilter === cat
                    ? "btn-primary active"
                    : "btn-outline-primary"
                }`}
                onClick={(e) => handleFilterChange(cat, e)}
              >
                <span className="cat-icon">
                  {/* Example: You can map icons for each category */}
                  {cat === "electronics" && <i className="bi bi-phone"></i>}
                  {cat === "fashion" && <i className="bi bi-bag"></i>}
                  {cat === "home" && <i className="bi bi-house"></i>}
                  {cat === "books" && <i className="bi bi-book"></i>}
                  {cat === "sports" && <i className="bi bi-trophy"></i>}
                  {/* Default icon for other categories */}
                  {!["electronics", "fashion", "home", "books", "sports"].includes(cat) && 
                   <i className="bi bi-tag"></i>}
                </span>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                <span className="cat-badge">
                  {products.filter((p) => p.category === cat).length}
                </span>
                {/* Sale Pill Example */}
                {cat === "sale" && <span className="cat-pill sale">Sale</span>}
                {cat === "featured" && (
                  <span className="cat-pill featured">★</span>
                )}
              </button>
            ))}
            {/* Animated Underline */}
            <span ref={underlineRef} className="filter-underline"></span>
          </div>
        </div>
      </div>

      {/* 🔥 Always render the filtered product list */}
{filterList.length > 0 ? (
  <Section
    title={`${
      activeFilter !== "all"
        ? activeFilter[0].toUpperCase() + activeFilter.slice(1)
        : "All"
    } Products`}
    bgColor="white"
    productItems={filterList}
    cardRef={addToCardsRefs}
  />
) : (
  !loading && (
    <div className="no-products-message text-center py-5">
      <div className="container">
        <h3>
          No products found
          {activeFilter !== "all" ? ` in "${activeFilter}" category` : ""}
          {searchQuery ? ` for "${searchQuery}"` : ""}
        </h3>
        <p className="text-muted">
          Try selecting a different category or search again.
        </p>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            handleFilterChange("all", e);
            setSearchValue("");
            setSearchQuery("");
          }}
        >
          View All Products
        </button>
      </div>
    </div>
  )
)}

      
      {/* All filtered products fallback */}
      {discountProducts.length === 0 &&
        newArrivalData.length === 0 &&
        bestSales.length === 0 &&
        filterList.length > 0 && (
          <Section
            title={`All ${
              activeFilter !== "all"
                ? activeFilter[0].toUpperCase() + activeFilter.slice(1)
                : "Products"
            }`}
            bgColor="white"
            productItems={filterList}
            cardRef={addToCardsRefs}
          />
        )}
      {/* No products message */}
      {filterList.length === 0 && !loading && (
        <div className="no-products-message text-center py-5">
          <div className="container">
            <h3>
              No products found
              {activeFilter !== "all" ? ` in "${activeFilter}" category` : ""}
              {searchQuery ? ` for "${searchQuery}"` : ""}
            </h3>
            <p className="text-muted">
              Try selecting a different category or search again.
            </p>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleFilterChange("all", e);
                setSearchValue("");
                setSearchQuery("");
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="loading-state text-center py-5">
          <div className="container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx="true">{`
        :root {
          --section-bg: #f6f9fc;
          --glass: rgba(255, 255, 255, 0.7);
          --glass-dark: rgba(30, 34, 44, 0.85);
        }
          #search-button{
          background:linear-gradient(45deg, #007bff, #0056b3) !important;
          border: none;
          border-radius: 999px;
          padding: 0.45em 1.3em;
          font-weight: 500;
          color: #fff;
          transition: background 0.22s, color 0.22s;
        }
        .glassy-bg {
          background: var(--glass);
          backdrop-filter: blur(12px) saturate(120%);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        .filter-bar {
          border-bottom: 1px solid #e3e8ee;
          background: var(--glass);
          border-radius: 1.5rem 1.5rem 0 0;
          box-shadow: 0 2px 8px #b7d0ff22;
        }
        .filter-search-input {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 1rem;
          border: 1px solid #b7d0ff55;
        }
        .filter-search .btn {
          border-radius: 999px;
        }
        .sort-dropdown select {
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid #b7d0ff55;
        }
        .clear-btn {
          border-radius: 999px;
          font-weight: 500;
          padding: 0.45em 1.3em;
        }
        .filter-buttons {
          margin: 0.5rem 0 0 0;
          scrollbar-width: thin;
          scrollbar-color: #b7d0ff #f6f9fc;
          gap: 0.5rem;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5em;
          position: relative;
          min-width: 130px;
          justify-content: center;
          border-radius: 999px;
          font-weight: 600;
          color: #0f3460;
          border: 2px solid #0f3460;
          background: var(--glass);
          transition: background 0.22s, color 0.22s, border 0.22s;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .filter-btn.btn-primary,
        .filter-btn.active {
          background: linear-gradient(45deg, #007bff, #0056b3);
          color: #fff;
          box-shadow: 0 6px 20px #0f346026;
        }
        .filter-btn .cat-icon {
          font-size: 1.1em;
          margin-right: 0.3em;
          line-height: 1;
        }
        .filter-btn .cat-badge {
          background: #fff;
          color: #007bff11;
          border-radius: 999px;
          font-size: 0.85em;
          padding: 0.1em 0.65em;
          margin-left: 0.4em;
          font-weight: 700;
          box-shadow: 0 2px 8px #b7d0ff20;
        }
        .filter-btn.active .cat-badge {
          background: rgba(255, 255, 255, 0.9);
          color: #0f3460;
        }
        .filter-btn .cat-pill {
          margin-left: 0.5em;
          border-radius: 999px;
          padding: 0.12em 0.7em;
          font-size: 0.8em;
          font-weight: 700;
        }
        .filter-btn .cat-pill.sale {
          background: #ff3c6f;
          color: #fff;
        }
        .filter-btn .cat-pill.featured {
          background: gold;
          color: #fff;
        }
        .filter-btn:not(.btn-primary):hover {
          background: linear-gradient(90deg, #007bff11, #00c6ff11);
          color: #007bff11;
          border-color: #007bff11;
        }
        .filter-underline {
          position: absolute;
          bottom: -6px;
          left: 0;
          height: 4px;
          width: 120px;
          background: linear-gradient(90deg, #007bff11, #00c6ff11);
          border-radius: 2px;
          transition: width 0.4s, left 0.4s;
          z-index: 10;
          pointer-events: none;
        }
        .no-products-message {
          background: var(--section-bg);
          border-radius: 18px;
          margin: 32px 12px;
          padding: 60px 15px;
          box-shadow: 0 2px 18px #b7d0ff0d;
        }
        .loading-state {
          background: var(--section-bg);
          border-radius: 18px;
          margin: 32px 12px;
          padding: 60px 15px;
        }
        .ripple {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0 !important;
          }
          .filter-buttons {
            padding: 1rem 0 !important;
          }
          .filter-btn {
            min-width: 120px;
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            flex: 0 0 auto;
          }
          .filter-search {
            width: 100%;
          }
          .sort-dropdown {
            width: 100%;
          }
          .clear-btn {
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .filter-btn {
            min-width: 110px;
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
          }
          .filter-btn .cat-badge {
            font-size: 0.75em;
            padding: 0.05em 0.5em;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Home;