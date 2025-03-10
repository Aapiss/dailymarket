import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHistory,
} from "react-icons/fa";
import { supabase } from "../../utils/SupaClient";
import Theme from "../daisy/Theme";

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUserProfile(user || null);
      setIsLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserProfile(session?.user || null);
        setProfileData(null);
        setIsLoading(false);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userProfile && !profileData) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", userProfile.id)
          .single();

        if (!error) setProfileData(data);
      };

      fetchProfile();
    }
  }, [userProfile, profileData]);

  useEffect(() => {
    if (userProfile) {
      const fetchCartCount = async () => {
        const { data, error } = await supabase
          .from("keranjang")
          .select("quantity")
          .eq("profile_id", userProfile.id);

        if (!error) {
          const totalQuantity = data.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setCartCount(totalQuantity);
        }
      };
      fetchCartCount();
    }
  }, [userProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setProfileData(null);
    setDropdownOpen(false);

    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false); // Close the menu on link click in mobile view
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return null;
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-md shadow-md z-50">
        <div className="px-4 md:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-blue-700 dark:text-white hover:text-blue-500 transition duration-300"
          >
            DailyMarket
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-blue-700 dark:text-white"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          <ul className="hidden md:flex space-x-8">
            {["Home", "About", "Product", "Contact"].map((menu, i) => {
              const path = menu === "Home" ? "/" : `/${menu.toLowerCase()}`;
              return (
                <li key={i}>
                  <Link
                    to={path}
                    className={`${
                      location.pathname === path
                        ? "text-blue-500"
                        : "text-blue-700 dark:text-white"
                    } hover:text-blue-500 transition duration-300`}
                  >
                    {menu}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User & Cart Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={profileData?.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-blue-300 dark:border-blue-700"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-blue-800 rounded-xl shadow-xl z-10">
                    <ul className="divide-y divide-blue-100 dark:divide-blue-700">
                      <li>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-700"
                        >
                          <FaUser className="w-5 h-5 mr-3" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/history"
                          className="flex items-center px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-700"
                        >
                          <FaHistory className="w-5 h-5 mr-3" />
                          History
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-3 text-red-600 w-full hover:bg-red-100 dark:hover:bg-red-700"
                        >
                          <FaSignOutAlt className="w-5 h-5 mr-3" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            )}

            <Link
              to="/cart"
              className="relative text-blue-700 dark:text-white hover:text-blue-500"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Theme />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
