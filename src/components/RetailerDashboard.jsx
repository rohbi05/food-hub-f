import React, { useState } from "react";

const RetailerDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setNewItem({ ...newItem, image: imageURL });
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMenuItems([...menuItems, newItem]);
    setNewItem({ image: "", name: "", price: "", description: "" });
  };

  const handleDelete = (index) => {
    const updated = [...menuItems];
    updated.splice(index, 1);
    setMenuItems(updated);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Top Navigation */}
      <div className="bg-yellow-100 flex justify-between items-center px-8 py-4 shadow">
        <div className="flex gap-8 text-yellow-700 font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Orders</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Dashboard Title */}
      <h1 className="text-center text-3xl font-extrabold text-yellow-700 mt-8 mb-6">
        ATLANCIS <span className="block font-medium text-lg">Retailer Dashboard</span>
      </h1>

      {/* Content Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            type="button"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full mb-4"
          >
            Food Details
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="block w-full border border-gray-300 rounded p-2 text-sm"
            />

            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={newItem.name}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded p-2 text-sm"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded p-2 text-sm"
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={newItem.description}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full"
            >
              Add Menu Item
            </button>
          </form>
        </div>

        {/* Menu Items - No background or shadow */}
        <div className="p-2 max-h-[500px] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4 flex flex-col items-center border border-yellow-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-24 h-24 object-cover mb-2"
                />
                <h3 className="text-sm font-bold text-yellow-700">{item.name}</h3>
                <p className="text-gray-700 text-xs">Ksh {item.price}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {item.description}
                  </p>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="mt-2 border border-yellow-500 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-50 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
