import React from "react";

const DashboardHome = () => {
  return (
    <div>
      {/* Welcome */}
      <h2 className="text-3xl font-bold text-yellow-700 mb-6">
        Welcome back, Retailer!
      </h2>
      <p className="text-gray-600 mb-8">
        Here’s a quick summary of your restaurant today.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-600">12</h3>
          <p className="text-gray-500">Orders Today</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-600">8</h3>
          <p className="text-gray-500">Pending Orders</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-600">24</h3>
          <p className="text-gray-500">Menu Items</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-600">Ksh 4,500</h3>
          <p className="text-gray-500">Revenue This Week</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-yellow-700 mb-4">Recent Orders</h3>
        <ul className="space-y-3">
          <li className="flex justify-between text-gray-600">
            <span>John Doe - Burger</span>
            <span className="text-green-500">Delivered</span>
          </li>
          <li className="flex justify-between text-gray-600">
            <span>Mary W. - Pizza</span>
            <span className="text-yellow-500">Pending</span>
          </li>
          <li className="flex justify-between text-gray-600">
            <span>David K. - Fries</span>
            <span className="text-red-500">Cancelled</span>
          </li>
        </ul>
        <button className="mt-4 text-sm text-yellow-600 hover:underline">
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
