import React from "react";
import { Link, useLocation } from "react-router-dom";
import Theme from "../daisy/Theme";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";

export default function Header() {
  const location = useLocation();
  const { user } = useAuth(); // Ambil status login dari useAuth
  const { getTotalUniqueItems } = useCart();
  const totalUniqueItems = getTotalUniqueItems();

  return (
    <>
      <header>
        <input
          type="checkbox"
          name="hbr"
          id="hbr"
          className="hbr peer"
          hidden
          aria-hidden="true"
        />
        <nav className="fixed z-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative md:bg-transparent dark:shadow-none">
          <div className="xl:container m-auto px-6 md:px-12 w-full">
            <div className="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
              <div className="w-full flex justify-between lg:w-auto">
                <a
                  href="#"
                  aria-label="logo"
                  className="flex space-x-2 items-center"
                >
                  <span className="text-base font-bold text-gray-600 dark:text-white">
                    DailyMarket
                  </span>
                </a>
                <label
                  htmlFor="hbr"
                  className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden ml-auto"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                </label>
              </div>
              <div className="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none lg:border-0">
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 tracking-wide font-medium text-lg lg:flex lg:space-y-0">
                    <li>
                      <Link
                        to={"/"}
                        className={`${
                          location.pathname === "/" ? "text-blue-400" : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/about"}
                        className={`${
                          location.pathname === "/about" ? "text-blue-400" : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/product"}
                        className={`${
                          location.pathname === "/product"
                            ? "text-blue-400"
                            : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/contact"}
                        className={`${
                          location.pathname === "/contact"
                            ? "text-blue-400"
                            : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l gap-6">
                  {user ? (
                    <>
                      <Link
                        to={"/cart"}
                        className="relative flex h-9 items-center justify-center sm:px-4 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 512 496"
                        >
                          <path
                            fill="currentColor"
                            d="M448 69H137l-3-12q-5-23-22.5-37.5T70 5H21q-9 0-15 6T0 27q0 9 6 15t15 6h49q19 0 22 17l49 256q6 21 23.5 34t38.5 13h202q10 0 16-6t6-15q0-22-22-22H203q-14 0-20-12l-2-9h214q20 0 36.5-12t22.5-31l58-123v-5q0-27-18.5-45.5T448 69zm-32 175v2q-3 15-21 15H173l-28-149h303q18 0 21 17zM256 432q0 18-12.5 30.5T213 475q-17 0-29.5-12.5T171 432t12.5-30.5T213 389q18 0 30.5 12.5T256 432zm171 0q0 18-12.5 30.5T384 475t-30.5-12.5T341 432t12.5-30.5T384 389t30.5 12.5T427 432z"
                          />
                        </svg>

                        {totalUniqueItems > 0 && (
                          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {totalUniqueItems}
                          </span>
                        )}
                      </Link>
                      <Link
                        to={"/profile"}
                        className="relative flex h-9 ml-5 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-blue-400 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Profile
                        </span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={"/login"}
                      className="relative flex h-9 ml-5 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-blue-400 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                    >
                      <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                        Login
                      </span>
                    </Link>
                  )}
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
