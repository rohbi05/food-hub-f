import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiSearch, FiShoppingCart } from "react-icons/fi";

const DUMMY_MENU = [
    { id: 1, name: "Burger Deluxe", price: 500, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Juicy beef burger with cheese and fries." },
    { id: 2, name: "Chicken Wrap", price: 400, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMHdyYXB8ZW58MHx8MHx8fDA%3D", description: "Grilled chicken wrap with fresh veggies." },
    { id: 3, name: "Pizza Slice", price: 350, image: "https://media.istockphoto.com/id/2170408203/photo/pizza-with-prosciutto-cotto-ham-and-mushrooms.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y_HumfU4vIxfQARuopWhFQNxg8zHy7R2uf4OSy3a0nc=", description: "Cheesy pepperoni pizza slice." },
    { id: 4, name: "Milkshake", price: 250, image: "https://plus.unsplash.com/premium_photo-1695868328902-b8a3b093da74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3NoYWtlfGVufDB8fDB8fHww", description: "Creamy vanilla milkshake." },
    { id: 5, name: "Fries Box", price: 200, image: "https://images.unsplash.com/photo-1639744210631-209fce3e256c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9hZGVkJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D", description: "Golden crispy fries." },
    { id: 6, name: "Hot Dog", price: 300, image: "https://media.istockphoto.com/id/1776523875/photo/street-food-elegance-street-food-hot-dog-brunch.webp?a=1&b=1&s=612x612&w=0&k=20&c=OyMfKt6ox4ODC99N3XVhK_S8bWYTepnnEwJXdFrFbMg=", description: "Classic hot dog with mustard." },
];

const MenuGrid = ({ menu, addToCart, onCardClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {menu.map(item => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                    onClick={() => onCardClick(item)} 
                >
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-gray-600">Ksh {item.price}</p>
                        <button
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                addToCart(item);
                            }}
                            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function CustomerDashboard() {
    const [activeView, setActiveView] = useState('menu'); 
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const navigate = useNavigate();

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
        console.log("Added to cart:", item.name);
    };

    const handleCardClick = (item) => {
        setSelectedItem(item);
    };

    const renderContent = () => {
        if (activeView === 'home') {
            return (
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h2>
                    <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                        Welcome to your dashboard! You can click the button below to view the menu.
                    </p>
                    <button
                        onClick={() => setActiveView('menu')}
                        className="mt-8 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                    >
                        View Menu
                    </button>
                </div>
            );
        } else if (activeView === 'menu') {
            return (
                <>
                    <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
                        <h1 className="text-4xl font-bold text-gray-900">Today's Menu 🍔</h1>
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search your favorite food..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0b100] transition-shadow"
                            />
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </header>
                    <MenuGrid 
                        menu={DUMMY_MENU} 
                        addToCart={addToCart} 
                        onCardClick={handleCardClick} 
                    />
                    {cart.length > 0 && (
                        <div className="mt-8 p-4 bg-white rounded-xl shadow-md flex justify-between items-center">
                            <p className="font-semibold">Items in cart: {cart.length}</p>
                            <button
                                onClick={() => setIsCartModalOpen(true)}
                                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center"
                            >
                                <FiShoppingCart className="mr-2" />
                                Checkout
                            </button>
                        </div>
                    )}
                </>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <nav className="fixed w-full bg-white border-b border-gray-100 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-10 h-10 bg-[#f0b100] rounded-lg flex items-center justify-center">
                            <FiShoppingBag className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-bold">Atlancis Foodhub</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Change this Link to a button with an onClick handler */}
                        <button
                            onClick={() => setActiveView('home')}
                            className="text-gray-600 hover:text-[#f0b100] font-medium transition-colors"
                        >
                            <FiHome className="inline mr-1" /> Home
                        </button>
                        {/* Change this 'a' tag to a button as well */}
                        <button
                            onClick={() => setActiveView('menu')}
                            className="text-gray-600 hover:text-[#f0b100] font-medium transition-colors"
                        >
                            <FiShoppingBag className="inline mr-1" /> Menu
                        </button>
                        <button
                            onClick={() => setIsCartModalOpen(true)}
                            className="text-gray-600 hover:text-[#f0b100] font-medium transition-colors"
                        >
                            <FiShoppingCart className="inline mr-1" /> Cart ({cart.length})
                        </button>
                        <Link to="/logout" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                            Logout
                        </Link>
                    </div>
                    <button className="md:hidden text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-6 pt-24 pb-12">
                {renderContent()}
            </main>

            {selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center p-4 z-50 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative animate-fade-in-up">
                        <button
                            onClick={() => setSelectedItem(null)} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-full h-56 object-cover rounded-xl mb-6 shadow-md"
                        />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedItem.name}</h2>
                        <p className="text-gray-600 mb-4 text-sm">{selectedItem.description}</p>
                        <p className="text-2xl font-bold text-[#f0b100] mb-6">Price: Ksh {selectedItem.price}</p>
                        <button 
                            onClick={() => {
                                addToCart(selectedItem);
                                setSelectedItem(null);
                            }}
                            className="w-full bg-[#f0b100] text-white py-3 rounded-lg font-semibold hover:bg-[#d89f00] transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
            
            {isCartModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center p-4 z-50 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl relative animate-fade-in-up">
                        <button
                            onClick={() => setIsCartModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center">Your cart is empty.</p>
                        ) : (
                            <div>
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-3">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600 text-sm">Ksh {item.price}</p>
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold">x{item.quantity}</div>
                                    </div>
                                ))}
                                <div className="mt-6 text-right">
                                    <p className="text-xl font-bold">Total: Ksh {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log("Proceeding to checkout with:", cart);
                                        setIsCartModalOpen(false);
                                    }}
                                    className="mt-6 w-full bg-[#f0b100] text-white py-3 rounded-lg font-semibold hover:bg-[#d89f00] transition-colors"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#f0b100] rounded-lg flex items-center justify-center">
                                    <FiShoppingBag className="text-white" />
                                </div>
                                <span className="text-xl font-bold">Atlancis Foodhub</span>
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Atlancis Internal System. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div> 
    );
}