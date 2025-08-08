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
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-yellow-700 mb-10">
        Atlancis Retailer Dashboard
      </h1>

      {/* Upload Good Conduct */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Upload Good Conduct Certificate</h2>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="block w-full text-gray-700"
        />
      </div>

      {/* Menu Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Upload Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-gray-700"
          />
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={newItem.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={newItem.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Add Menu Item
          </button>
        </form>
      </div>

      {/* Display Menu Items */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 relative">
            <img src={item.image} alt={item.name} className="rounded-lg h-40 w-full object-cover mb-2" />
            <h3 className="text-lg font-bold text-yellow-700">{item.name}</h3>
            <p className="text-gray-700 mb-1">Ksh {item.price}</p>
            {item.description && (
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(index)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              {/* You can add an edit button here later */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerDashboard;
