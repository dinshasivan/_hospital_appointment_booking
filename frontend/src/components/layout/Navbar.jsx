import React, { useState } from "react";
import Login from "../components/../patient/Login";
import Register from "../components/../patient/Register";

const Navbar = () => {
  const [modal, setModal] = useState(null); // null, "login", or "register"

  const closeModal = () => setModal(null);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-400">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-white">HealthCare+</div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#book" className="text-white font-medium">Book Appointment</a>
            <a href="#doctors" className="text-white font-medium">Find Doctor</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setModal("login")}
              className="text-white font-medium"
            >
              Login
            </button>

            <button
              onClick={() => setModal("register")}
              className="text-white px-4 py-2 rounded-md transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow"
            >
              ✕
            </button>
            {modal === "login" && <Login />}
            {modal === "register" && <Register />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;