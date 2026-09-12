import{r as b,j as e}from"./index-BVKenPga.js";const u=[{id:"phones-tablets",label:"Phones & Tablets",icon:"bi-phone",description:"Smartphones & Tablets",brands:[{id:"apple",label:"Apple",icon:"bi-phone-fill",productTypes:[{id:"iphone",label:"iPhone"},{id:"ipad",label:"iPad"}]},{id:"samsung",label:"Samsung",icon:"bi-phone-flip",productTypes:[{id:"samsung-galaxy",label:"Samsung Galaxy"},{id:"samsung-tab",label:"Samsung Tab"}]},{id:"infinix",label:"Infinix",icon:"bi-phone",productTypes:[{id:"infinix-phone",label:"Infinix Phone"}]},{id:"tecno",label:"Tecno",icon:"bi-phone",productTypes:[{id:"tecno-phone",label:"Tecno Phone"}]},{id:"itel",label:"Itel",icon:"bi-phone",productTypes:[{id:"itel-phone",label:"Itel Phone"}]},{id:"xiaomi",label:"Xiaomi",icon:"bi-phone",productTypes:[{id:"xiaomi-phone",label:"Xiaomi Phone"},{id:"redmi-phone",label:"Redmi Phone"}]},{id:"tablets-generic",label:"Tablets",icon:"bi-tablet",productTypes:[{id:"android-tablet",label:"Android Tablet"}]}]},{id:"phone-accessories",label:"Phone Accessories",icon:"bi-bag",description:"Chargers, Cases, Cables & More",brands:[{id:"accessories",label:"Accessories",icon:"bi-bag",productTypes:[{id:"charger",label:"Charger"},{id:"power-bank",label:"Power Bank"},{id:"cable",label:"Phone Cords"},{id:"earbuds",label:"Earphones"},{id:"phone-case",label:"Phone Case"},{id:"screen-protector",label:"Screen Protector"},{id:"bluetooth-speaker",label:"Bluetooth Speaker"},{id:"microsd-card",label:"MicroSD Card"}]}]},{id:"smart-watches",label:"Smart Watches",icon:"bi-smartwatch",description:"Smartwatches & Fitness Bands",brands:[{id:"smart-watches-generic",label:"Smart Watches",icon:"bi-smartwatch",productTypes:[{id:"smartwatch",label:"Smartwatch"},{id:"fitness-band",label:"Fitness Band"}]}]},{id:"electronics",label:"Electronics",icon:"bi-camera-video",description:"Security & Surveillance, Home & Kitchen Electronics",brands:[{id:"security-surveillance",label:"Security & Surveillance",icon:"bi-camera",productTypes:[{id:"cctv-camera",label:"CCTV Camera"},{id:"ip-camera",label:"IP Camera"},{id:"ptz-camera",label:"PTZ Camera"},{id:"dvr",label:"DVR"},{id:"nvr",label:"NVR"},{id:"4g-solar-camera",label:"4G Solar Camera"},{id:"solar-ptz-camera",label:"Solar PTZ Camera"},{id:"solar-bullet-camera",label:"Solar Bullet Camera"}]},{id:"home-appliances",label:"Home Appliances",icon:"bi-house-gear",productTypes:[{id:"hot-plate",label:"Hot Plate"},{id:"electric-kettle",label:"Electric Kettle"},{id:"microwave",label:"Microwave"},{id:"blender",label:"Blender"},{id:"air-fryer",label:"Air Fryer"},{id:"rice-cooker",label:"Rice Cooker"},{id:"electric-iron",label:"Electric Iron"},{id:"standing-fan",label:"Standing Fan"},{id:"water-dispenser",label:"Water Dispenser"},{id:"hair-clipper",label:"Hair Clipper"},{id:"tv",label:"TV"},{id:"bulb",label:"Bulb"}]},{id:"generic-electronics",label:"Other Electronics",icon:"bi-lightning-charge",productTypes:[{id:"extension-box",label:"Extension Box"},{id:"stabilizer",label:"Stabilizer / AVR"},{id:"inverter",label:"Inverter"}]}]},{id:"audio",label:"Audio",icon:"bi-earbuds",description:"Headphones, Soundbars & Audio Equipment",brands:[{id:"oraimo",label:"Oraimo",icon:"bi-earbuds",productTypes:[{id:"headphones",label:"Headphones"},{id:"earbuds-audio",label:"Earbuds"}]},{id:"generic-audio",label:"Generic",icon:"bi-speaker",productTypes:[{id:"soundbar",label:"Soundbar"}]}]},{id:"computers",label:"Computers",icon:"bi-laptop",description:"Laptops & Computer Accessories",brands:[{id:"generic-computers",label:"Generic",icon:"bi-laptop",productTypes:[{id:"laptop",label:"Laptop"},{id:"mouse",label:"Mouse"},{id:"keyboard",label:"Keyboard"},{id:"hard-drive",label:"Hard Drive"}]}]}],_=n=>u.find(o=>o.id===n)||null,V=n=>{for(const o of u){const t=o.brands.find(f=>f.id===n);if(t)return t}return null},X=n=>{const o=_(n);return o?o.label:n},Z=n=>{const o=V(n);return o?o.label:n},q=n=>{for(const o of u)for(const t of o.brands){const f=t.productTypes.find(p=>p.id===n);if(f)return f.label}return n},J=[{id:"b1",label:"Under ₦5K",min:0,max:5e3},{id:"b2",label:"₦5K – ₦10K",min:5e3,max:1e4},{id:"b3",label:"₦10K – ₦30K",min:1e4,max:3e4},{id:"b4",label:"₦30K – ₦50K",min:3e4,max:5e4},{id:"b5",label:"Above ₦50K",min:5e4,max:1/0}],Y=[4,3,2,1],W=[10,20,30,50],Q=({products:n=[],onFilterChange:o})=>{var T;const[t,f]=b.useState(null),[p,j]=b.useState(null),[s,m]=b.useState(null),[r,N]=b.useState(null),[h,w]=b.useState(null),[y,S]=b.useState(!1),[k,C]=b.useState(null),[c,A]=b.useState({categories:!0,price:!1,rating:!1,stock:!1,discount:!1}),d=(i={})=>{o({group:t,brand:p,type:(s==null?void 0:s.type)??null,priceRange:r?{min:r.min,max:r.max}:null,minRating:h,inStock:y,minDiscount:k,...i})},z=i=>{const a=t===i?null:i;f(a),j(null),m(null),d({group:a,brand:null,type:null})},B=(i,a)=>{const l=p===a.id?null:a.id;j(l),m(null),d({group:i.id,brand:l,type:null})},E=(i,a,l)=>{(s==null?void 0:s.group)===i.id&&(s==null?void 0:s.brand)===a.id&&(s==null?void 0:s.type)===l?(m(null),d({group:i.id,brand:a.id,type:null})):(m({group:i.id,brand:a.id,type:l}),d({group:i.id,brand:a.id,type:l}))},I=i=>{const a=(r==null?void 0:r.id)===i.id?null:i;N(a),d({priceRange:a?{min:a.min,max:a.max}:null})},$=i=>{const a=h===i?null:i;w(a),d({minRating:a})},K=i=>{const a=k===i?null:i;C(a),d({minDiscount:a})},O=()=>{const i=!y;S(i),d({inStock:i})},g=i=>{A(a=>({...a,[i]:!a[i]}))},D=i=>n.filter(a=>a.category===i).length,M=i=>n.filter(a=>a.brand===i).length,G=i=>n.filter(a=>a.productType===i).length,H=t||p||s||r||h||y||k,v=s?u.find(i=>i.id===s.group):null,x=s?u.flatMap(i=>i.brands).find(i=>i.id===s.brand):null,F=s?((T=x==null?void 0:x.productTypes.find(i=>i.id===s.type))==null?void 0:T.label)??s.type:null,L=()=>{f(null),j(null),m(null),N(null),w(null),S(!1),C(null),o({group:null,brand:null,type:null,priceRange:null,minRating:null,inStock:!1,minDiscount:null})};return e.jsxs("aside",{className:"pf-sidebar",children:[e.jsxs("div",{className:"pf-header",children:[e.jsxs("span",{className:"pf-title",children:[e.jsx("i",{className:"bi bi-funnel-fill me-2"}),"Filters"]}),H&&e.jsxs("button",{className:"pf-clear-btn",onClick:L,children:[e.jsx("i",{className:"bi bi-x-circle me-1"}),"Clear All"]})]}),s&&e.jsxs("div",{className:"pf-breadcrumb",children:[e.jsx("span",{children:v==null?void 0:v.label}),e.jsx("i",{className:"bi bi-chevron-right pf-bc-arrow"}),e.jsx("span",{children:x==null?void 0:x.label}),e.jsx("i",{className:"bi bi-chevron-right pf-bc-arrow"}),e.jsx("span",{className:"pf-bc-active",children:F})]}),e.jsxs("div",{className:"pf-sections",children:[e.jsxs("div",{className:"pf-section",children:[e.jsxs("button",{className:"pf-section-toggle",onClick:()=>g("categories"),children:[e.jsxs("span",{className:"pf-section-title",children:[e.jsx("i",{className:"bi bi-list me-2"}),"Categories"]}),e.jsx("i",{className:`bi bi-chevron-${c.categories?"up":"down"}`})]}),c.categories&&e.jsx("ul",{className:"pf-group-list",children:u.map(i=>e.jsxs("li",{className:"pf-group-item",children:[e.jsxs("button",{className:`pf-group-btn ${t===i.id?"is-open":""}`,onClick:()=>z(i.id),children:[e.jsxs("span",{className:"pf-row-left",children:[e.jsx("i",{className:`bi ${i.icon} pf-group-icon`}),e.jsx("span",{className:"pf-group-label",children:i.label}),e.jsx("span",{className:"pf-badge",children:D(i.id)})]}),e.jsx("i",{className:`bi bi-chevron-${t===i.id?"up":"down"} pf-caret`})]}),t===i.id&&e.jsx("ul",{className:"pf-brand-list",children:i.brands.map(a=>e.jsxs("li",{children:[e.jsxs("button",{className:`pf-brand-btn ${p===a.id?"is-open":""}`,onClick:()=>B(i,a),children:[e.jsxs("span",{className:"pf-row-left",children:[e.jsx("i",{className:`bi ${a.icon} pf-brand-icon`}),e.jsx("span",{className:"pf-brand-label",children:a.label}),e.jsx("span",{className:"pf-badge",children:M(a.id)})]}),e.jsx("i",{className:`bi bi-chevron-${p===a.id?"up":"down"} pf-caret`})]}),p===a.id&&e.jsx("div",{className:"pf-chips",children:a.productTypes.map(l=>{const P=(s==null?void 0:s.brand)===a.id&&(s==null?void 0:s.type)===l.id,R=G(l.id);return e.jsxs("button",{className:`pf-chip ${P?"is-active":""}`,onClick:()=>E(i,a,l.id),children:[l.label,R>0&&e.jsx("span",{className:"pf-chip-cnt",children:R})]},l.id)})})]},a.id))})]},i.id))})]}),e.jsxs("div",{className:"pf-section",children:[e.jsxs("button",{className:"pf-section-toggle",onClick:()=>g("price"),children:[e.jsxs("span",{className:"pf-section-title",children:[e.jsx("i",{className:"bi bi-tag me-2"}),"Price Range"]}),e.jsx("i",{className:`bi bi-chevron-${c.price?"up":"down"}`})]}),c.price&&e.jsx("div",{className:"pf-filter-group",children:e.jsx("div",{className:"pf-chips pf-chips--stack",children:J.map(i=>e.jsx("button",{className:`pf-chip ${(r==null?void 0:r.id)===i.id?"is-active":""}`,onClick:()=>I(i),children:i.label},i.id))})})]}),e.jsxs("div",{className:"pf-section",children:[e.jsxs("button",{className:"pf-section-toggle",onClick:()=>g("rating"),children:[e.jsxs("span",{className:"pf-section-title",children:[e.jsx("i",{className:"bi bi-star me-2"}),"Rating"]}),e.jsx("i",{className:`bi bi-chevron-${c.rating?"up":"down"}`})]}),c.rating&&e.jsx("div",{className:"pf-filter-group",children:e.jsx("div",{className:"pf-rating-list",children:Y.map(i=>e.jsxs("button",{className:`pf-rating-row ${h===i?"is-active":""}`,onClick:()=>$(i),children:[e.jsxs("span",{className:"pf-stars",children:[Array(i).fill(0).map((a,l)=>e.jsx("i",{className:"bi bi-star-fill"},l)),Array(5-i).fill(0).map((a,l)=>e.jsx("i",{className:"bi bi-star"},`empty-${l}`))]}),e.jsxs("span",{className:"pf-rating-text",children:[i,"★ & up"]})]},i))})})]}),e.jsxs("div",{className:"pf-section",children:[e.jsxs("button",{className:"pf-section-toggle",onClick:()=>g("stock"),children:[e.jsxs("span",{className:"pf-section-title",children:[e.jsx("i",{className:"bi bi-box-seam me-2"}),"Availability"]}),e.jsx("i",{className:`bi bi-chevron-${c.stock?"up":"down"}`})]}),c.stock&&e.jsx("div",{className:"pf-filter-group",children:e.jsxs("label",{className:"pf-checkbox-label",children:[e.jsx("input",{type:"checkbox",checked:y,onChange:O,className:"pf-checkbox"}),e.jsx("span",{children:"In Stock Only"})]})})]}),e.jsxs("div",{className:"pf-section",children:[e.jsxs("button",{className:"pf-section-toggle",onClick:()=>g("discount"),children:[e.jsxs("span",{className:"pf-section-title",children:[e.jsx("i",{className:"bi bi-percent me-2"}),"Discount"]}),e.jsx("i",{className:`bi bi-chevron-${c.discount?"up":"down"}`})]}),c.discount&&e.jsx("div",{className:"pf-filter-group",children:e.jsx("div",{className:"pf-chips pf-chips--stack",children:W.map(i=>e.jsxs("button",{className:`pf-chip ${k===i?"is-active":""}`,onClick:()=>K(i),children:[i,"%+ OFF"]},i))})})]})]}),e.jsx("style",{children:`
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
      `})]})};export{u as C,Q as P,Z as a,X as b,q as g};
