import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IProEdgeHeader from "./components/Iproedgeheader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Success = lazy(() => import("./pages/Success"));

const ReferralPage = lazy(() => import("./pages/ReferralPage"));

const AccountLayout = lazy(
  () => import("./pages/Account/AccountLayout")
);

const Profile = lazy(() => import("./pages/Account/Profile"));
const Wishlist = lazy(() => import("./pages/Account/Wishlist"));
const Orders = lazy(() => import("./pages/Account/Orders"));
const OrderDetails = lazy(
  () => import("./pages/Account/OrderDetails")
);
const Addresses = lazy(() => import("./pages/Account/Addresses"));
const Wallet = lazy(() => import("./pages/Account/Wallet"));

const GiftCards = lazy(() => import("./pages/Account/GiftCards"));
const ReturnsRefunds = lazy(
  () => import("./pages/Account/ReturnsRefunds")
);
const EmailNewsletter = lazy(
  () => import("./pages/Account/EmailNewsletter")
);
const SupportTickets = lazy(
  () => import("./pages/Account/SupportTickets")
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <Router>
        <IProEdgeHeader />

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <NavBar />

        <Routes>
          {/* Main website */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Success />} />

          {/* Existing dashboard */}
         
          <Route path="/refer" element={<ReferralPage />} />

          {/* Customer Account */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Profile />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="orders/details/:id"
              element={<OrderDetails />}
            />
            <Route path="addresses" element={<Addresses />} />
            <Route path="wallet" element={<Wallet />} />
           
            <Route path="gift-cards" element={<GiftCards />} />
            <Route
              path="return-refunds"
              element={<ReturnsRefunds />}
            />
            <Route
              path="email-newsletter"
              element={<EmailNewsletter />}
            />
            <Route
              path="support-ticket"
              element={<SupportTickets />}
            />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;