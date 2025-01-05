import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../assets/images.png";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  RiHome5Fill,
  RiStore3Fill,
  RiUserAddFill,
  RiLoginCircleFill,
  RiLogoutCircleRFill,
} from "react-icons/ri";
import {
  HiMiniUserCircle,
  HiMagnifyingGlass,
  HiShoppingBag,
} from "react-icons/hi2";
import GetQuote from "./Get_Quote";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

const Navbar = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Navigate
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear("users");
      navigate("/login");
    }
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add new state for search
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to track navbar visibility
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  let lastScrollTop = 0;

  // State to control the visibility of the GetQuote modal
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#0F4C36] sticky top-0 shadow-lg z-50">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
          {/* Logo */}
          <div className="flex justify-between items-center px-4 py-2 lg:py-0">
            <Link to={"/"} className="hover:scale-105 transition-transform">
              <img src={logo} alt="logo" className="w-8 h-6 lg:w-12 lg:h-10" />
            </Link>

            {/* Mobile Search and User */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                className="text-white focus:outline-none hover:text-gray-200"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle Search"
              >
                <HiMagnifyingGlass className="text-2xl hover:scale-110 transition-transform" />
              </button>
              {user ? (
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  }
                >
                  <HiMiniUserCircle className="text-2xl text-white hover:scale-110 transition-transform" />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <HiMiniUserCircle className="text-2xl text-white hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-row items-center">
            <ul className="flex lg:space-x-3 text-white font-medium text-md space-x-4 items-center">
              <li>
                <Link to={"/"} className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/allproduct"} className="hover:text-gray-200">
                  All Product
                </Link>
              </li>
              {!user && (
                <>
                  <li>
                    <Link to={"/signup"} className="hover:text-gray-200">
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link to={"/login"} className="hover:text-gray-200">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {user?.role === "user" && (
                <li>
                  <Link to={"/user-dashboard"} className="hover:text-gray-200">
                    User
                  </Link>
                </li>
              )}
              {user?.role === "admin" && (
                <li>
                  <Link to={"/admin-dashboard"} className="hover:text-gray-200">
                    Admin
                  </Link>
                </li>
              )}
              {user && (
                <li
                  className="cursor-pointer hover:text-gray-200"
                  onClick={logout}
                >
                  Logout
                </li>
              )}
              <li>
                <Link to={"/cart"} className="hover:text-gray-200">
                  Cart({cartItems.length})
                </Link>
              </li>
              {/* <li>
                <Link
                  onClick={() => setIsQuoteOpen(true)}
                  className="hover:text-gray-200"
                >
                  Call Back
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="block lg:hidden px-4 pb-3">
            <SearchBar />
          </div>
        )}
      </nav>

      {/* Bottom Navbar for Mobile Devices */}
      <div
        className={`fixed bottom-0 w-full bg-white p-3 flex justify-around items-center lg:hidden transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "translate-y-full"
        } z-50`}
      >
        <Link to={"/"} className="flex flex-col items-center text-[#0B5D44]">
          <RiHome5Fill className="text-2xl hover:scale-110 transition-transform" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to={"/allproduct"}
          className="flex flex-col items-center text-[#0B5D44]"
        >
          <RiStore3Fill className="text-2xl hover:scale-110 transition-transform" />
          <span className="text-xs">Products</span>
        </Link>
        {/* <li
          onClick={() => setIsQuoteOpen(true)}
          className="flex flex-col items-center text-[#0B5D44]"
        >
          <MdOutlinePermPhoneMsg className="text-2xl hover:scale-110 transition-transform" />
          <span className="text-xs">Call back</span>
        </li> */}
        <Link
          to={"/cart"}
          className="flex flex-col items-center text-[#0B5D44]"
        >
          <HiShoppingBag className="text-2xl hover:scale-110 transition-transform" />
          <span className="text-xs">Cart({cartItems.length})</span>
        </Link>
        {user && (
          <button
            onClick={logout}
            className="flex flex-col items-center text-[#0B5D44] focus:outline-none"
          >
            <RiLogoutCircleRFill className="text-2xl hover:scale-110 transition-transform" />
            <span className="text-xs">Logout</span>
          </button>
        )}
      </div>

      {/* Get Quote Modal */}
      {isQuoteOpen && <GetQuote onClose={() => setIsQuoteOpen(false)} />}
    </>
  );
};

export default Navbar;
