import{r as n,j as s,C as t,R as i,a as r}from"./index-CW9Vn4lQ.js";import{P as l}from"./useSanityProducts-D9IYTgUn.js";const o=({productItems:a})=>!a||a.length===0?s.jsx("h1",{className:"not-found",children:"Product Not Found !!"}):s.jsxs("section",{className:"shop-lis",children:[s.jsx(t,{fluid:!0,className:"p-0",children:s.jsx(i,{className:"m-0 p-0",style:{"--bs-gutter-x":"0"},children:a.map(e=>s.jsx(r,{xs:6,sm:4,md:3,lg:3,xl:2,className:"p-0 shop-list-col",children:s.jsx(l,{title:null,productItem:e})},e.id))})}),s.jsx("style",{children:`
        /* Prevent ProductCard (or its image) from having a fixed/min width
           that's wider than a 50%-width mobile column — that's what breaks
           "2 per row" visually even when the Bootstrap column math is right.
           !important is needed here because a hardcoded inline style like
           <Card style={{ width: "18rem" }}> — a very common Bootstrap
           default — otherwise beats a normal stylesheet rule outright. */
        .shop-list-col {
          min-width: 0;
        }

        .shop-list-col > * {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box;
        }

        .shop-list-col .card {
          width: 100% !important;
          max-width: 100% !important;
        }

        .shop-list-col img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
      `})]}),h=n.memo(o),c="/assets/banner-CJBxhi9o.jpg",x=({title:a,subtitle:e})=>s.jsxs("div",{className:"image-container",children:[s.jsx("img",{src:c,alt:"Banner",className:"banner-img"}),s.jsx("div",{className:"overlay",children:s.jsx(t,{children:s.jsx(i,{className:"text-center",children:s.jsx(r,{children:s.jsxs("div",{className:"banner-content",children:[s.jsx("h1",{className:"banner-title",children:a}),e&&s.jsx("p",{className:"banner-subtitle",children:e}),s.jsxs("div",{className:"banner-decoration",children:[s.jsx("span",{className:"decoration-line"}),s.jsx("span",{className:"decoration-dot"}),s.jsx("span",{className:"decoration-line"})]})]})})})})}),s.jsxs("div",{className:"particles",children:[s.jsx("div",{className:"particle"}),s.jsx("div",{className:"particle"}),s.jsx("div",{className:"particle"}),s.jsx("div",{className:"particle"}),s.jsx("div",{className:"particle"})]})]});export{x as B,h as S};
