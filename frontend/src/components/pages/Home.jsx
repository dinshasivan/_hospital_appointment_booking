import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar.jsx";
// import AvailableDoctors from "../components/AvailableDoctors";
import Footer from "../layout/Footer.jsx";
import hospital from "../../assets/hospital.png";


const Home = () => {
  return (
    <div className="w-full">
      <Navbar />

      {/* Banner Section */}
      <div className="relative w-full h-screen pt-16">
        <img
          src={hospital}
          alt="Hospital"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Welcome to the Hospital Appointment Booking System
          </h1>

          <p className="text-lg md:text-xl text-white text-center mt-4">
            Your health is our priority. Book your appointment now!
          </p>

          <div className="mt-6">
            <Link
              to="/book"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;