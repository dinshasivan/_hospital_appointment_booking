import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layout/MainLayout'
import Home from './components/pages/Home.jsx'
import AdminDashboard from './components/pages/AdminDashboard'
import DoctorDemographics from './components/demographics/DoctorDemographics'
import UserDemographics from './components/demographics/UserDemographics'
import ListAppointments from './components/appointment/ListAppointments'
import Login from './components/patient/Login'
import Register from './components/patient/Register'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<DoctorDemographics />} />
            <Route path="/admin/users" element={<UserDemographics />} />
            <Route path="/appointments" element={<ListAppointments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
