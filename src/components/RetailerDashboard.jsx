import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";


const RetailerDashboard = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    // Clear auth tokens or session here
    logout();
    console.log("Logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-yellow-50">
      {/* Sidebar */}
      <div className="w-64 bg-yellow-600 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Retailer Dashboard</h2>
        <nav className="space-y-4">
          <Link
            to=""
            className="block px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Dashboard
          </Link>
          <Link
            to="menu"
            className="block px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Menu
          </Link>
          <Link
            to="orders"
            className="block px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Orders
          </Link>
          <Link
            to="profile"
            className="block px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full mt-10 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
};

export default RetailerDashboard;
