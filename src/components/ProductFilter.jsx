import { useState } from "react";
import { CATEGORY_HIERARCHY } from "../utils/categories";

// ── Preset price brackets — the pattern Nigerian shoppers actually expect,
// not a dual-thumb slider on a small screen ──
const PRICE_BRACKETS = [
  { id: "b1", label: "Under ₦10K", min: 0, max: 10000 },
  { id: "b2", label: "₦50K – ₦150K", min: 50000, max: 150000 },
  { id: "b3", label: "₦150K – ₦300K", min: 150000, max: 300000 },
  { id: "b4", label: "₦300K – ₦500K", min: 300000, max: 500000 },
  { id: "b5", label: "Above ₦500K", min: 500000, max: Infinity },
];

// ── Single-select rating floor: "4★ & up", not five independent checkboxes ──
const RATING_OPTIONS = [4, 3, 2, 1];

// ── Discount presets instead of a min/max percent slider ──
const DISCOUNT_PRESETS = [10, 20, 30, 50];

const ProductFilter = ({ products = [], onFilterChange }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const [openBrand, setOpenBrand] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const [priceBracket, setPriceBracket] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minDiscount, setMinDiscount] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: false,
    rating: false,
    stock: false,
    discount: false,
  });

  // ── Emit the full filter state on every change ──
  const emit = (overrides = {}) => {
    onFilterChange({
      group: openGroup,
      brand: openBrand,
      type: activeType?.type ?? null,
      priceRange: priceBracket ? { min: priceBracket.min, max: priceBracket.max } : null,
      minRating,
      inStock: inStockOnly,
      minDiscount,
      ...overrides,
    });
  };

  const toggleGroup = (groupId) => {
    const next = openGroup === groupId ? null : groupId;
    setOpenGroup(next);
    setOpenBrand(null);
    setActiveType(null);
    emit({ group: next, brand: null, type: null });
  };

  const toggleBrand = (group, brand) => {
    const next = openBrand === brand.id ? null : brand.id;
    setOpenBrand(next);
    setActiveType(null);
    emit({ group: group.id, brand: next, type: null });
  };

  const selectType = (group, brand, type) => {
    const isSame =
      activeType?.group === group.id &&
      activeType?.brand === brand.id &&
      activeType?.type === type;

    if (isSame) {
      setActiveType(null);
      emit({ group: group.id, brand: brand.id, type: null });
    } else {
      setActiveType({ group: group.id, brand: brand.id, type });
      emit({ group: group.id, brand: brand.id, type });
    }
  };

  const selectPriceBracket = (bracket) => {
    const next = priceBracket?.id === bracket.id ? null : bracket;
    setPriceBracket(next);
    emit({ priceRange: next ? { min: next.min, max: next.max } : null });
  };

  const selectRating = (rating) => {
    const next = minRating === rating ? null : rating;
    setMinRating(next);
    emit({ minRating: next });
  };

  const selectDiscount = (pct) => {
    const next = minDiscount === pct ? null : pct;
    setMinDiscount(next);
    emit({ minDiscount: next });
  };

  const toggleStock = () => {
    const next = !inStockOnly;
    setInStockOnly(next);
    emit({ inStock: next });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const countGroup = (gId) => products.filter((p) => p.category === gId).length;
  const countBrand = (bId) => products.filter((p) => p.brand === bId).length;
  const countType = (pType) => products.filter((p) => p.productType === pType).length;

  const hasActive =
    openGroup || openBrand || activeType || priceBracket || minRating || inStockOnly || minDiscount;

  const activeGroup = activeType
    ? CATEGORY_HIERARCHY.find((g) => g.id === activeType.group)
    : null;

  const activeBrand = activeType
    ? CATEGORY_HIERARCHY.flatMap((g) => g.brands).find((b) => b.id === activeType.brand)
    : null;

  const clearAll = () => {
    setOpenGroup(null);
    setOpenBrand(null);
    setActiveType(null);
    setPriceBracket(null);
    setMinRating(null);
    setInStockOnly(false);
    setMinDiscount(null);
    onFilterChange({
      group: null,
      brand: null,
      type: null,
      priceRange: null,
      minRating: null,
      inStock: false,
      minDiscount: null,
    });
  };

  return (
    <aside className="pf-sidebar">
      <div className="pf-header">
        <span className="pf-title">
          <i className="bi bi-funnel-fill me-2" />
          Filters
        </span>
        {hasActive && (
          <button className="pf-clear-btn" onClick={clearAll}>
            <i className="bi bi-x-circle me-1" />
            Clear All
          </button>
        )}
      </div>

      {activeType && (
        <div className="pf-breadcrumb">
          <span>{activeGroup?.label}</span>
          <i className="bi bi-chevron-right pf-bc-arrow" />
          <span>{activeBrand?.label}</span>
          <i className="bi bi-chevron-right pf-bc-arrow" />
          <span className="pf-bc-active">{activeType.type}</span>
        </div>
      )}

      <div className="pf-sections">
        {/* ── CATEGORIES SECTION ── */}
        <div className="pf-section">
          <button className="pf-section-toggle" onClick={() => toggleSection("categories")}>
            <span className="pf-section-title">
              <i className="bi bi-list me-2" />
              Categories
            </span>
            <i className={`bi bi-chevron-${expandedSections.categories ? "up" : "down"}`} />
          </button>

          {expandedSections.categories && (
            <ul className="pf-group-list">
              {CATEGORY_HIERARCHY.map((group) => (
                <li key={group.id} className="pf-group-item">
                  <button
                    className={`pf-group-btn ${openGroup === group.id ? "is-open" : ""}`}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <span className="pf-row-left">
                      <i className={`bi ${group.icon} pf-group-icon`} />
                      <span className="pf-group-label">{group.label}</span>
                      <span className="pf-badge">{countGroup(group.id)}</span>
                    </span>
                    <i className={`bi bi-chevron-${openGroup === group.id ? "up" : "down"} pf-caret`} />
                  </button>

                  {openGroup === group.id && (
                    <ul className="pf-brand-list">
                      {group.brands.map((brand) => (
                        <li key={brand.id}>
                          <button
                            className={`pf-brand-btn ${openBrand === brand.id ? "is-open" : ""}`}
                            onClick={() => toggleBrand(group, brand)}
                          >
                            <span className="pf-row-left">
                              <i className={`bi ${brand.icon} pf-brand-icon`} />
                              <span className="pf-brand-label">{brand.label}</span>
                              <span className="pf-badge">{countBrand(brand.id)}</span>
                            </span>
                            <i className={`bi bi-chevron-${openBrand === brand.id ? "up" : "down"} pf-caret`} />
                          </button>

                          {openBrand === brand.id && (
                            <div className="pf-chips">
                              {brand.productTypes.map((type) => {
                                const isActive =
                                  activeType?.brand === brand.id && activeType?.type === type;
                                const cnt = countType(type);

                                return (
                                  <button
                                    key={type}
                                    className={`pf-chip ${isActive ? "is-active" : ""}`}
                                    onClick={() => selectType(group, brand, type)}
                                  >
                                    {type}
                                    {cnt > 0 && <span className="pf-chip-cnt">{cnt}</span>}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── PRICE SECTION — preset brackets, single-select ── */}
        <div className="pf-section">
          <button className="pf-section-toggle" onClick={() => toggleSection("price")}>
            <span className="pf-section-title">
              <i className="bi bi-tag me-2" />
              Price Range
            </span>
            <i className={`bi bi-chevron-${expandedSections.price ? "up" : "down"}`} />
          </button>

          {expandedSections.price && (
            <div className="pf-filter-group">
              <div className="pf-chips pf-chips--stack">
                {PRICE_BRACKETS.map((bracket) => (
                  <button
                    key={bracket.id}
                    className={`pf-chip ${priceBracket?.id === bracket.id ? "is-active" : ""}`}
                    onClick={() => selectPriceBracket(bracket)}
                  >
                    {bracket.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RATING SECTION — single-select "X★ & up" ── */}
        <div className="pf-section">
          <button className="pf-section-toggle" onClick={() => toggleSection("rating")}>
            <span className="pf-section-title">
              <i className="bi bi-star me-2" />
              Rating
            </span>
            <i className={`bi bi-chevron-${expandedSections.rating ? "up" : "down"}`} />
          </button>

          {expandedSections.rating && (
            <div className="pf-filter-group">
              <div className="pf-rating-list">
                {RATING_OPTIONS.map((rating) => (
                  <button
                    key={rating}
                    className={`pf-rating-row ${minRating === rating ? "is-active" : ""}`}
                    onClick={() => selectRating(rating)}
                  >
                    <span className="pf-stars">
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <i key={i} className="bi bi-star-fill" />
                        ))}
                      {Array(5 - rating)
                        .fill(0)
                        .map((_, i) => (
                          <i key={`empty-${i}`} className="bi bi-star" />
                        ))}
                    </span>
                    <span className="pf-rating-text">{rating}★ &amp; up</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── STOCK SECTION ── */}
        <div className="pf-section">
          <button className="pf-section-toggle" onClick={() => toggleSection("stock")}>
            <span className="pf-section-title">
              <i className="bi bi-box-seam me-2" />
              Availability
            </span>
            <i className={`bi bi-chevron-${expandedSections.stock ? "up" : "down"}`} />
          </button>

          {expandedSections.stock && (
            <div className="pf-filter-group">
              <label className="pf-checkbox-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={toggleStock}
                  className="pf-checkbox"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          )}
        </div>

        {/* ── DISCOUNT SECTION — presets instead of a percent-range slider ── */}
        <div className="pf-section">
          <button className="pf-section-toggle" onClick={() => toggleSection("discount")}>
            <span className="pf-section-title">
              <i className="bi bi-percent me-2" />
              Discount
            </span>
            <i className={`bi bi-chevron-${expandedSections.discount ? "up" : "down"}`} />
          </button>

          {expandedSections.discount && (
            <div className="pf-filter-group">
              <div className="pf-chips pf-chips--stack">
                {DISCOUNT_PRESETS.map((pct) => (
                  <button
                    key={pct}
                    className={`pf-chip ${minDiscount === pct ? "is-active" : ""}`}
                    onClick={() => selectDiscount(pct)}
                  >
                    {pct}%+ OFF
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap");

        .pf-sidebar {
          --sky: #2f86d6;
          --sky-deep: #1b5fa6;
          --sky-tint: #eaf4fc;
          --ink: #14171f;
          --gold: #f2a93b;
          --clay: #e8552b;
          --line: rgba(20, 23, 31, 0.1);

          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 14px rgba(15, 42, 67, 0.06);
          font-size: 13px;
          font-family: "Inter", sans-serif;
        }

        /* ── Header ── */
        .pf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          background: var(--sky-tint);
          border-bottom: 1px solid var(--line);
        }
        .pf-title {
          font-family: "Sora", sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: var(--ink);
        }
        .pf-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--clay);
          font-size: 12px;
          font-weight: 600;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 3px;
          transition: opacity 0.2s;
        }
        .pf-clear-btn:hover { opacity: 0.75; }

        /* ── Breadcrumb ── */
        .pf-breadcrumb {
          padding: 7px 14px;
          font-size: 11px;
          font-family: "JetBrains Mono", monospace;
          color: var(--sky-deep);
          background: var(--sky-tint);
          border-bottom: 1px solid rgba(47, 134, 214, 0.2);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 3px;
        }
        .pf-bc-arrow { font-size: 9px; }
        .pf-bc-active { color: var(--gold); font-weight: 700; }

        /* ── Sections Container ── */
        .pf-sections {
          padding: 0;
          max-height: 800px;
          overflow-y: auto;
        }

        .pf-section {
          border-bottom: 1px solid #f1f4f8;
        }
        .pf-section:last-child { border-bottom: none; }

        .pf-section-toggle {
          width: 100%;
          background: none;
          border: none;
          padding: 12px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
          font-family: "Sora", sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: var(--ink);
        }
        .pf-section-toggle:hover { background: #f8fafd; }

        .pf-section-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pf-section-toggle i {
          font-size: 12px;
          color: #9ca3af;
          transition: transform 0.2s;
        }

        .pf-filter-group {
          padding: 10px 15px;
          background: #fafbfc;
        }

        /* ── Checkbox ── */
        .pf-checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          cursor: pointer;
          font-size: 12px;
          color: #374151;
          transition: color 0.2s;
        }
        .pf-checkbox-label:hover { color: var(--ink); }

        .pf-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: var(--sky);
        }

        /* ── Rating rows ── */
        .pf-rating-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pf-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid var(--line);
          border-radius: 8px;
          padding: 7px 10px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: "Inter", sans-serif;
        }

        .pf-rating-row:hover {
          border-color: var(--sky);
          background: var(--sky-tint);
        }

        .pf-rating-row.is-active {
          background: var(--sky-tint);
          border-color: var(--sky);
        }

        .pf-stars {
          display: flex;
          align-items: center;
          gap: 1px;
        }

        .pf-stars i {
          font-size: 11px;
          color: var(--gold);
        }

        .pf-stars i.bi-star {
          color: #d1d5db;
        }

        .pf-rating-text {
          font-size: 11.5px;
          font-weight: 600;
          color: #374151;
        }

        .pf-rating-row.is-active .pf-rating-text {
          color: var(--sky-deep);
        }

        /* ── Group list ── */
        .pf-group-list {
          list-style: none;
          margin: 0;
          padding: 6px 0;
        }
        .pf-group-item { border-bottom: 1px solid #f1f4f8; }
        .pf-group-item:last-child { border-bottom: none; }

        .pf-group-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 11px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
        }
        .pf-group-btn:hover   { background: var(--sky-tint); }
        .pf-group-btn.is-open { background: #dbeaf9; }

        .pf-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pf-group-icon {
          font-size: 14px;
          color: var(--sky-deep);
          width: 16px;
          text-align: center;
        }
        .pf-group-label {
          font-family: "Sora", sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: var(--ink);
        }

        /* ── Level 2 list ── */
        .pf-brand-list {
          list-style: none;
          margin: 0;
          padding: 4px 0 6px;
          background: #f8fafd;
          border-top: 1px solid var(--line);
          animation: pf-slide 0.18s ease;
        }

        .pf-brand-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 9px 15px 9px 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
        }
        .pf-brand-btn:hover   { background: var(--sky-tint); }
        .pf-brand-btn.is-open { background: #dbeaf9; }

        .pf-brand-icon {
          font-size: 12px;
          color: #6b7280;
          width: 14px;
          text-align: center;
        }
        .pf-brand-label {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          color: #1f2937;
        }

        /* ── Badge ── */
        .pf-badge {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          font-weight: 700;
          background: #e5e7eb;
          color: #6b7280;
          border-radius: 999px;
          padding: 1px 6px;
        }

        .pf-caret {
          font-size: 10px;
          color: #9ca3af;
        }

        /* ── Chips (product type / price / discount) ── */
        .pf-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 7px 14px 10px 42px;
          animation: pf-slide 0.15s ease;
        }

        .pf-chips--stack {
          padding: 4px 2px;
        }

        .pf-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fff;
          border: 1.5px solid #d1d5db;
          border-radius: 999px;
          padding: 4px 11px;
          font-family: "Inter", sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          line-height: 1.4;
        }
        .pf-chip:hover {
          border-color: var(--sky);
          color: var(--sky-deep);
          background: var(--sky-tint);
        }
        .pf-chip.is-active {
          background: var(--sky);
          border-color: var(--sky);
          color: #fff;
          box-shadow: 0 2px 8px rgba(47, 134, 214, 0.28);
        }
        .pf-chip-cnt {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          background: rgba(0, 0, 0, 0.13);
          border-radius: 999px;
          padding: 0 5px;
          font-weight: 700;
        }
        .pf-chip.is-active .pf-chip-cnt {
          background: rgba(255, 255, 255, 0.28);
        }

        @keyframes pf-slide {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Scrollbar ── */
        .pf-sections::-webkit-scrollbar { width: 6px; }
        .pf-sections::-webkit-scrollbar-track { background: #f1f5f9; }
        .pf-sections::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .pf-sections::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </aside>
  );
};

export default ProductFilter;