import { useState } from "react";

// ─── Full catalogue structure ─────────────────────────────────────────────────
const CATALOGUE = [
    {
        id: "phones-tablets",
        label: "Phones & Tablets",
        icon: "bi-phone",
        brands: [
            {
                id: "iphone",
                label: "iPhone",
                icon: "bi-phone-fill",
                types: ["iPhone"],
            },
            {
                id: "samsung",
                label: "Samsung",
                icon: "bi-phone-flip",
                types: ["Samsung"],
            },
            {
                id: "tablets",
                label: "Tablets",
                icon: "bi-tablet",
                types: ["iPad", "Samsung Tab", "Android Tablet"],
            },
            {
                id: "accessories",
                label: "Accessories",
                icon: "bi-bag",
                types: [
                    "Charger",
                    "Power Bank",
                    "Phone Cords",
                    "Earphones",
                    "Smartwatch",
                    "Bluetooth Speaker",
                    "MicroSD Card",
                    "Hair Clipper",
                ],
            },
        ],
    },
    {
        id: "electronics",
        label: "Electronics",
        icon: "bi-camera-video",
        brands: [
            {
                id: "dahua",
                label: "Dahua",
                icon: "bi-shield-check",
                types: ["CCTV Camera", "DVR", "NVR", "PTZ Camera"],
            },
            {
                id: "hikvision",
                label: "Hikvision",
                icon: "bi-camera",
                types: ["CCTV Camera", "DVR", "NVR", "IP Camera"],
            },
            {
                id: "solar",
                label: "Solar Cameras",
                icon: "bi-sun",
                types: ["4G Solar Camera", "Solar PTZ Camera", "Solar Bullet Camera"],
            },
        ],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ProductFilter = ({ products = [], onFilterChange }) => {
    const [openGroup, setOpenGroup]   = useState(null);
    const [openBrand, setOpenBrand]   = useState(null);
    const [activeType, setActiveType] = useState(null);

    // ── Toggles ──
    const toggleGroup = (groupId) => {
        const next = openGroup === groupId ? null : groupId;
        setOpenGroup(next);
        setOpenBrand(null);
        setActiveType(null);
        onFilterChange({ group: next, brand: null, type: null });
    };

    const toggleBrand = (group, brand) => {
        const next = openBrand === brand.id ? null : brand.id;
        setOpenBrand(next);
        setActiveType(null);
        onFilterChange({ group: group.id, brand: next, type: null });
    };

    const selectType = (group, brand, type) => {
        const isSame =
            activeType?.group === group.id &&
            activeType?.brand === brand.id &&
            activeType?.type  === type;
        if (isSame) {
            setActiveType(null);
            onFilterChange({ group: group.id, brand: brand.id, type: null });
        } else {
            setActiveType({ group: group.id, brand: brand.id, type });
            onFilterChange({ group: group.id, brand: brand.id, type });
        }
    };

    const clearAll = () => {
        setOpenGroup(null);
        setOpenBrand(null);
        setActiveType(null);
        onFilterChange({ group: null, brand: null, type: null });
    };

    // ── Count helpers ──
    const countGroup = (gId)       => products.filter(p => p.category    === gId).length;
    const countBrand = (bId)       => products.filter(p => p.brand       === bId).length;
    const countType  = (bId, type) => products.filter(p => p.brand === bId && p.productType === type).length;

    const hasActive = openGroup || openBrand || activeType;

    // ── Active label for breadcrumb ──
    const activeGroup = activeType ? CATALOGUE.find(g => g.id === activeType.group) : null;
    const activeBrand = activeType ? CATALOGUE.flatMap(g => g.brands).find(b => b.id === activeType.brand) : null;

    return (
        <aside className="pf-sidebar">

            {/* Header */}
            <div className="pf-header">
        <span className="pf-title">
          <i className="bi bi-funnel-fill me-2" />
          Categories
        </span>
                {hasActive && (
                    <button className="pf-clear-btn" onClick={clearAll}>
                        <i className="bi bi-x-circle me-1" />
                        Clear
                    </button>
                )}
            </div>

            {/* Breadcrumb */}
            {activeType && (
                <div className="pf-breadcrumb">
                    <span>{activeGroup?.label}</span>
                    <i className="bi bi-chevron-right pf-bc-arrow" />
                    <span>{activeBrand?.label}</span>
                    <i className="bi bi-chevron-right pf-bc-arrow" />
                    <span className="pf-bc-active">{activeType.type}</span>
                </div>
            )}

            {/* Tree */}
            <ul className="pf-group-list">
                {CATALOGUE.map(group => (
                    <li key={group.id} className="pf-group-item">

                        {/* Level 1 — Group */}
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

                        {/* Level 2 — Brands */}
                        {openGroup === group.id && (
                            <ul className="pf-brand-list">
                                {group.brands.map(brand => (
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

                                        {/* Level 3 — Type chips */}
                                        {openBrand === brand.id && (
                                            <div className="pf-chips">
                                                {brand.types.map(type => {
                                                    const isActive =
                                                        activeType?.brand === brand.id &&
                                                        activeType?.type  === type;
                                                    const cnt = countType(brand.id, type);
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

            <style>{`
        /* ── Sidebar shell ── */
        .pf-sidebar {
          background: #fff;
          border: 1px solid #e4e9f0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 14px rgba(0,0,0,0.07);
          font-size: 13px;
          font-family: inherit;
        }

        /* ── Header ── */
        .pf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          background: #f7f9fc;
          border-bottom: 1px solid #e4e9f0;
        }
        .pf-title {
          font-weight: 700;
          font-size: 13px;
          color: #111827;
        }
        .pf-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #dc2626;
          font-size: 12px;
          font-weight: 600;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .pf-clear-btn:hover { opacity: 0.75; }

        /* ── Breadcrumb ── */
        .pf-breadcrumb {
          padding: 7px 14px;
          font-size: 11px;
          color: #6b7280;
          background: #fffbeb;
          border-bottom: 1px solid #fde68a;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 3px;
        }
        .pf-bc-arrow { font-size: 9px; }
        .pf-bc-active { color: #b45309; font-weight: 700; }

        /* ── Group list ── */
        .pf-group-list {
          list-style: none;
          margin: 0;
          padding: 6px 0;
        }
        .pf-group-item {
          border-bottom: 1px solid #f1f4f8;
        }
        .pf-group-item:last-child { border-bottom: none; }

        /* ── Level 1 btn ── */
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
        .pf-group-btn:hover   { background: #f0f6ff; }
        .pf-group-btn.is-open { background: #e8f0fe; }

        .pf-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pf-group-icon {
          font-size: 14px;
          color: #2563eb;
          width: 16px;
          text-align: center;
        }
        .pf-group-label {
          font-weight: 700;
          font-size: 13px;
          color: #111827;
        }

        /* ── Level 2 list ── */
        .pf-brand-list {
          list-style: none;
          margin: 0;
          padding: 4px 0 6px;
          background: #f8fafd;
          border-top: 1px solid #e4e9f0;
          animation: pf-slide 0.18s ease;
        }

        /* ── Level 2 btn ── */
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
        .pf-brand-btn:hover   { background: #eff6ff; }
        .pf-brand-btn.is-open { background: #dbeafe; }

        .pf-brand-icon {
          font-size: 12px;
          color: #6b7280;
          width: 14px;
          text-align: center;
        }
        .pf-brand-label {
          font-weight: 600;
          color: #1f2937;
        }

        /* ── Badge ── */
        .pf-badge {
          font-size: 10px;
          font-weight: 700;
          background: #e5e7eb;
          color: #6b7280;
          border-radius: 999px;
          padding: 1px 6px;
        }

        /* ── Caret ── */
        .pf-caret {
          font-size: 10px;
          color: #9ca3af;
        }

        /* ── Level 3 chips ── */
        .pf-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 7px 14px 10px 42px;
          animation: pf-slide 0.15s ease;
        }
        .pf-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fff;
          border: 1.5px solid #d1d5db;
          border-radius: 999px;
          padding: 4px 11px;
          font-size: 11.5px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          line-height: 1.4;
        }
        .pf-chip:hover {
          border-color: #2563eb;
          color: #2563eb;
          background: #eff6ff;
        }
        .pf-chip.is-active {
          background: #2563eb;
          border-color: #2563eb;
          color: #fff;
          box-shadow: 0 2px 8px rgba(37,99,235,0.28);
        }
        .pf-chip-cnt {
          font-size: 10px;
          background: rgba(0,0,0,0.13);
          border-radius: 999px;
          padding: 0 5px;
          font-weight: 700;
        }
        .pf-chip.is-active .pf-chip-cnt {
          background: rgba(255,255,255,0.28);
        }

        @keyframes pf-slide {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
        </aside>
    );
};

export default ProductFilter;