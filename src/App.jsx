// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";
import RetailerDashboard from "./components/RetailerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* This routes to home */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/retailer" element={<RetailerDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
