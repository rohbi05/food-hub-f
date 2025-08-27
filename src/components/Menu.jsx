import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/authContext.jsx";
// import { useRetailer } from "../context/retailerContext.jsx";
import { useMenu } from "../context/menuContext.jsx";
import vite from "../../src/assets/bg-snacks.png"

const MenuDashboard = () => {
    // const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        image: vite,
        price: "",
        description: "",
        available: true,
        });
    const [editingItem, setEditingItem] = useState(null); // stores the item being edited
    const [showEditForm, setShowEditForm] = useState(false);
    const [error, setError] = useState("");
    const { createMenu, setRetailerMenu, retailerMenu, fetchMenuItems, UpdateMenuItem, deleteMenuItem } = useMenu();
    useEffect(() => {
       fetchMenuItems(); // fetches retailer’s food items on mount
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
        ...formData,
        [name]: files ? files[0] : value,
        });
    };
    const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("image", formData.image);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("available", formData.available);

        const newItem = await createMenu(data);

        setRetailerMenu(newItem.data);

        setFormData({
            name: "",
            image: null,
            price: "",
            description: "",
            available: true,
        });
    } catch (err) {
        setError(err.message || "Menu creation failed.");
    }
    };
    const handleEditClick = (item) => {
        setEditingItem(item);
        setShowEditForm(true);
    };

    const handleDelete = async (id) => {
        try{
            const response = await deleteMenuItem(id);
            setRetailerMenu((prev) => prev.filter((item) => item.id !== id));
            return response;
    }catch(err){
        setError(err.message || "Delete failed.");
    }
    };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h2 className="text-2xl font-bold text-yellow-700 mb-6">Manage Menu</h2>

      {/* Menu Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 max-w-2xl">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <h3 className="text-xl font-semibold text-yellow-600 mb-4">
          Add New Menu Item
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>setFormData({ ...formData, image: e.target.files[0] })}
            required
            className="block w-full text-gray-700"
          />
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
                    {/* Availability toggle */}
            <div className="flex items-center gap-4">
            <label className="flex items-center">
                <input
                type="radio"
                name="available"
                value={true}
                checked={formData.available === true}
                onChange={() => setFormData({ ...formData, available: true })}
                className="mr-2"
                />
                Available
            </label>
            <label className="flex items-center">
                <input
                type="radio"
                name="available"
                value={false}
                checked={formData.available === false}
                onChange={() => setFormData({ ...formData, available: false })}
                className="mr-2"
                />
                Not Available
            </label>
            </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Add Menu Item
          </button>
        </form>
      </div>

      {/*Update Form */}
      {showEditForm && editingItem && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-96 z-60">
                <h2 className="text-xl font-bold mb-4">Update Food Item</h2>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                        const data = new FormData();
                        data.append("name", formData.name);
                        data.append("price", formData.price);
                        data.append("description", formData.description);
                        if (formData.image) data.append("image", formData.image);

                        await UpdateMenuItem(editingItem.id, data);
                        setRetailerMenu((prev) => prev.map((item) => item.id === editingItem.id ?{
                            ...item,
                            name: formData.name,
                            price: formData.price,
                            description: formData.description,
                            //image: formData.image

                        }: item)); 
                        setShowEditForm(false);
                        setEditingItem(null);
                        } catch (err) {
                        console.error("Failed to update", err);
                        }
                    }}
                    >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border p-2 mb-2"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        className="block w-full text-gray-700"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full border p-2 mb-2"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border p-2 mb-2"
                    />
                    <div className="flex justify-between">
                        <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setShowEditForm(false);
                            setEditingItem(null);
                        }}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                        Save
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            )}

      {/* Display menu */}
      <h3 className="text-xl font-semibold text-yellow-600 mb-4">Your Menu</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {retailerMenu && retailerMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-4 relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg h-40 w-full object-cover mb-2"
            />
            <h3 className="text-lg font-bold text-yellow-700">{item.name}</h3>
            <p className="text-gray-700 mb-1">Ksh {item.price}</p>
            {item.description && (
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
            )}
            <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => handleEditClick(item)}
                >
                Update
            </button>
            <button 
                onClick={() => handleDelete(item.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                Delete
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDashboard;
