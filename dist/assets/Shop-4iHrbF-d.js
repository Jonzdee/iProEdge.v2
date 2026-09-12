import{r as a,j as e,C as A,R as M,a as C,O as g}from"./index-hNzXxAR6.js";import{u as E,a as V}from"./useSanityProducts-D3eXq4vk.js";import{B as O,S as Q}from"./Banner-Bu46tVdt.js";import{P as L,g as W,a as q,b as K}from"./ProductFilter-CuFDKLLB.js";import{B as G}from"./Badge-Ci2CqpBV.js";import"./useDispatch-Dvr4dVli.js";const $=()=>{const{products:d=[],loading:p}=E(),[l,R]=a.useState([]),[u,y]=a.useState("newest"),[w,f]=a.useState(""),[m,h]=a.useState(""),[x,j]=a.useState([]),[F,c]=a.useState(!1),[s,v]=a.useState({group:null,brand:null,type:null,priceRange:null,minRating:null,inStock:!1,minDiscount:null}),[P,b]=a.useState(!1);V();const D=(t,r)=>{const o=[...t];switch(r){case"priceLowHigh":return o.sort((n,i)=>(n.price||0)-(i.price||0));case"priceHighLow":return o.sort((n,i)=>(i.price||0)-(n.price||0));case"popular":return o.sort((n,i)=>(i.popularity||0)-(n.popularity||0));default:return o.sort((n,i)=>new Date(i.createdAt||0)-new Date(n.createdAt||0))}};a.useEffect(()=>{let t=[...d];if(s.group&&(t=t.filter(r=>r.category===s.group)),s.brand&&(t=t.filter(r=>r.brand===s.brand)),s.type&&(t=t.filter(r=>r.productType===s.type)),s.priceRange){const{min:r,max:o}=s.priceRange;t=t.filter(n=>{const i=n.price||0;return i>=r&&i<=o})}if(s.minRating&&(t=t.filter(r=>(r.avgRating||0)>=s.minRating)),s.inStock&&(t=t.filter(r=>r.inStock===!0)),s.minDiscount&&(t=t.filter(r=>(r.discount||0)>=s.minDiscount)),m.trim()){const r=m.toLowerCase();t=t.filter(o=>o.productName&&o.productName.toLowerCase().includes(r)||o.brand&&o.brand.toLowerCase().includes(r)||o.productType&&o.productType.toLowerCase().includes(r)||o.category&&o.category.toLowerCase().includes(r))}R(D(t,u))},[d,s,m,u]);const k=t=>{v({group:t.group??null,brand:t.brand??null,type:t.type??null,priceRange:t.priceRange??null,minRating:t.minRating??null,inStock:t.inStock??!1,minDiscount:t.minDiscount??null})},H=t=>{const r=t.target.value;if(f(r),r.trim().length>0){const o=d.filter(n=>{var i;return(i=n.productName)==null?void 0:i.toLowerCase().includes(r.toLowerCase())}).map(n=>n.productName).slice(0,6);j([...new Set(o)]),c(!0)}else j([]),c(!1),h("")},B=t=>{t.preventDefault(),h(w),c(!1)},T=t=>{f(t),h(t),c(!1)},N=()=>{v({group:null,brand:null,type:null,priceRange:null,minRating:null,inStock:!1,minDiscount:null}),f(""),h("")},z=s.group||s.brand||s.type||s.priceRange||s.minRating||s.inStock||s.minDiscount||m,S=[s.group,s.brand,s.type,s.priceRange,s.minRating,s.inStock?!0:null,s.minDiscount].filter(Boolean).length,I=()=>s.type?W(s.type):s.brand?q(s.brand):s.group?K(s.group):"All Products";return e.jsxs(a.Fragment,{children:[e.jsx(O,{title:"Products"}),e.jsxs("section",{className:"filter-bar py-3 py-md-4",children:[e.jsx(A,{fluid:!0,className:"px-3 px-md-4 mt-3 mt-md-5",children:e.jsxs(M,{className:"g-3",children:[e.jsx(C,{md:3,className:"d-none d-md-block",children:e.jsx(L,{products:d,onFilterChange:k})}),e.jsxs(C,{xs:12,md:9,children:[e.jsxs("form",{className:"d-flex gap-2 mb-3 shop-toolbar",onSubmit:B,children:[e.jsxs("div",{className:"shop-search flex-grow-1",style:{position:"relative",minWidth:0},children:[e.jsx("input",{type:"text",className:"form-control shop-search-input",placeholder:"Search phones, tablets, cameras...",value:w,onChange:H,onKeyDown:t=>t.key==="Escape"&&c(!1),onBlur:()=>setTimeout(()=>c(!1),150),onFocus:()=>x.length>0&&c(!0),autoComplete:"off"}),F&&x.length>0&&e.jsx("ul",{className:"shop-autocomplete",children:x.map((t,r)=>e.jsxs("li",{onMouseDown:()=>T(t),className:"shop-autocomplete-item",children:[e.jsx("i",{className:"bi bi-search text-muted me-2",style:{fontSize:12}}),t]},r))})]}),e.jsxs("select",{className:"form-select shop-sort d-none d-md-block",value:u,onChange:t=>y(t.target.value),children:[e.jsx("option",{value:"newest",children:"Sort: Newest"}),e.jsx("option",{value:"priceLowHigh",children:"Price: Low to High"}),e.jsx("option",{value:"priceHighLow",children:"Price: High to Low"}),e.jsx("option",{value:"popular",children:"Most Popular"})]}),e.jsxs("button",{type:"button",className:"mobile-filter-btn d-md-none",onClick:()=>b(!0),children:[e.jsx("i",{className:"bi bi-funnel-fill"}),"Filters",S>0&&e.jsx(G,{bg:"light",text:"dark",className:"mobile-filter-count",children:S})]})]}),e.jsx("div",{className:"d-md-none mb-3",children:e.jsxs("select",{className:"form-select shop-sort",value:u,onChange:t=>y(t.target.value),children:[e.jsx("option",{value:"newest",children:"Sort: Newest"}),e.jsx("option",{value:"priceLowHigh",children:"Price: Low to High"}),e.jsx("option",{value:"priceHighLow",children:"Price: High to Low"}),e.jsx("option",{value:"popular",children:"Most Popular"})]})}),e.jsxs("div",{className:"d-flex align-items-center justify-content-between shop-heading",children:[e.jsxs("div",{children:[e.jsx("h2",{children:I()}),!p&&e.jsxs("p",{className:"text-muted mb-0",children:[l.length," item",l.length===1?"":"s"]})]}),z&&e.jsxs("button",{className:"clear-btn",type:"button",onClick:N,children:[e.jsx("i",{className:"bi bi-x-lg me-1"})," Clear"]})]}),p&&e.jsxs("div",{className:"text-center py-5",children:[e.jsx("div",{className:"market-spinner",role:"status",children:e.jsx("span",{className:"visually-hidden",children:"Loading..."})}),e.jsx("p",{className:"mt-3 loading-copy",children:"Checking current stock..."})]}),!p&&l.length>0&&e.jsx(Q,{productItems:l}),!p&&l.length===0&&e.jsxs("div",{className:"no-products-message text-center py-5",children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("h3",{className:"mt-3",children:"Nothing matches that search"}),e.jsx("p",{className:"text-muted",children:"Try a different category, brand, or spelling — or clear filters to see everything in stock."}),e.jsxs("button",{className:"btn-market",onClick:N,children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"View All Products"]})]})]})]})}),e.jsxs(g,{show:P,onHide:()=>b(!1),placement:"end",className:"mobile-filter-drawer d-md-none",children:[e.jsx(g.Header,{closeButton:!0,children:e.jsx(g.Title,{children:"Filters"})}),e.jsxs(g.Body,{children:[e.jsx(L,{products:d,onFilterChange:k}),e.jsxs("button",{type:"button",className:"mobile-filter-apply",onClick:()=>b(!1),children:["Show ",l.length," Result",l.length===1?"":"s"]})]})]})]}),e.jsx("style",{children:`
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
      `})]})};export{$ as default};
