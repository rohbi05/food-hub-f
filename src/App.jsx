// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";
import RetailerDashboard from "./components/RetailerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import PasswordResetRequest from "./components/PasswordReset";
import PasswordResetConfirm from "./components/PasswordResetConfirm";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* This routes to home */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/retailer" element={<RetailerDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/PasswordResetRequest" element={<PasswordResetRequest />} />
        <Route path="/PasswordResetConfirm/:uid/:token/" element={<PasswordResetConfirm />} />
      </Routes>
    </Router>
  )
}

export default App