// Orders.jsx
import { useState } from "react";

export default function Orders() {
  const [orders] = useState([
    { id: 1, customer: "Alice", item: "Chapati", quantity: 3, status: "Pending" },
    { id: 2, customer: "John", item: "Pilau", quantity: 2, status: "Delivered" },
    { id: 3, customer: "Mary", item: "Samosa", quantity: 5, status: "Pending" },
  ]);

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-600">Pending</span>;
    }
    if (status === "Delivered") {
      return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">Delivered</span>;
    }
    if (status === "Cancelled") {
      return <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">Cancelled</span>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Item</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{order.customer}</td>
                <td className="p-4">{order.item}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4 space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
                    Mark Delivered
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
