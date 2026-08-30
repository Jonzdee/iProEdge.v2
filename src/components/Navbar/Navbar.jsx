import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import SignInModal from "../../components/Auth/SignInModel";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) setIsFixed(true);
      else if (window.scrollY <= 50) setIsFixed(false);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const displayName = user?.displayName
    ? user.displayName.split(" ")[0]
    : user?.email
    ? user.email.split("@")[0]
    : "";

  const fallbackAvatar = (
    <div className="fallback-avatar">{displayName.charAt(0).toUpperCase() || "U"}</div>
  );

  const userAvatar = user?.photoURL ? (
    <img
      src={user.photoURL}
      alt={displayName || "profile"}
      title={displayName}
      style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
      onError={e => (e.target.style.display = 'none')}
    />
  ) : (
    fallbackAvatar
  );

  // Sign out function
  const handleSignOut = async () => {
    await signOut(auth);
    setExpand(false); // Close navbar on sign out
  };
  
  // Helper to handle nav link click (auto close/collapse)
  const handleNavLinkClick = () => setExpand(false);

  // Avatar Dropdown (for both mobile and desktop)
  const avatarDropdown = (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        id="dropdown-user"
        style={{
          boxShadow: "none",
          border: "none",
          background: "none",
          padding: 0,
          minWidth: 32,
          minHeight: 32,
        }}
      >
        {userAvatar}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>
          {displayName}
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item
  as={Link}
  to="/account"
  onClick={handleNavLinkClick}
>
  My Account
</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        expanded={expand}
        onToggle={(expanded) => setExpand(expanded)}
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
            <ion-icon name="bag"></ion-icon>
            <h1 className="logo">iproedge</h1>
          </Navbar.Brand>
          {/* MOBILE: Avatar/Login & Cart & Hamburger (shown only on mobile) */}
          <div className="d-flex media-cart d-md-none">
            {user ? (
              avatarDropdown
            ) : (
              <button
                className="nav-icon"
                aria-label="Sign in"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginRight: 4,
                }}
                onClick={() => setShowSignIn(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  width={30}
                  height={30}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart"
              data-num={cartList.length}
              style={{ marginLeft: 4 }}
              onClick={handleNavLinkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width={30}
                height={30}
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpand(!expand)}
              className="ms-2"
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>
          {/* DESKTOP: Nav links and right-side avatar/login & cart (shown only on md and up) */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Link className="navbar-link" to="/" onClick={handleNavLinkClick}>
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="navbar-link" to="/shop" onClick={handleNavLinkClick}>
                  <span className="nav-link-label">Shop</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="navbar-link" to="/cart" onClick={handleNavLinkClick}>
                  <span className="nav-link-label">Cart</span>
                </Link>
              </Nav.Item>
             
              <Nav.Item className="expanded-cart d-none d-md-flex align-items-center">
                {user ? (
                  avatarDropdown
                ) : (
                  <button
                    className="nav-icon"
                    aria-label="Sign in"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      marginRight: 4,
                    }}
                    onClick={() => setShowSignIn(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      width={30}
                      height={30}
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                <Link
                  aria-label="Go to Cart Page"
                  to="/cart"
                  className="cart"
                  data-num={cartList.length}
                  style={{ marginLeft: 4 }}
                  onClick={handleNavLinkClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    width={30}
                    height={30}
                  >
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignInModal show={showSignIn} onHide={() => setShowSignIn(false)} />
    </>
  );
};

export default NavBar;