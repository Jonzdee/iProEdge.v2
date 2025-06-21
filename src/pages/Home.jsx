import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSanityProducts } from "../hooks/useSanityProducts";
import Loader from "../components/Loader";

const Home = () => {
  const { products = [], loading } = useSanityProducts();
  useWindowScrollToTop();

  // Select by labels instead of category
  const newArrivalData = products.filter(
  item => Array.isArray(item.labels) && item.labels.includes("newArrivals")
);
const bestSales = products.filter(
  item => Array.isArray(item.labels) && item.labels.includes("bestSales")
);
const discoutProducts = products.filter(
  item => (item.discount && item.discount > 0) ||
          (Array.isArray(item.labels) && item.labels.includes("bigDiscount"))
);
  if (loading) return <Loader />;

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section
        title="Best Sales"
        bgColor="#f6f9fc"
        productItems={bestSales}
      />
    </Fragment>
  );
};

export default Home;