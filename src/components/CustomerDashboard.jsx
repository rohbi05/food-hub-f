import React, { useState } from 'react';
import TopBar from './TopBar';
import CustomerForm from './CustomerForm';
import MenuGrid from './MenuGrid';
import ProfileForm from './ProfileForm';
import CheckoutView from './CheckoutView';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [view, setView] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', image: null });

  const sampleMenu = [
    { id: 1, name: 'Burger', price: 350, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80' },
    { id: 2, name: 'Pizza', price: 800, img: 'https://images.unsplash.com/photo-1601924638867-3ec2ef8da8a5?w=800&q=80' },
    { id: 3, name: 'Chips', price: 200, img: 'https://images.unsplash.com/photo-1585238342020-96629a248dd0?w=800&q=80' },
    { id: 4, name: 'Salad', price: 300, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addToCart = (item) => setCart(prev => [...prev, item]);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    setView("checkout");
  };

  return (
    <div
      className="min-h-screen flex relative"
      style={{
        // background: customer 
        //   ? "#fefce8" 
        //   : "linear-gradient(to right, #facc15 50%, white 50%)",
      }}
    >
      {/* {!customer && (
        <div className="w-1/2 hidden md:block relative">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1200&q=80"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
      )} */}

      <div className="flex-1 p-6 overflow-auto">
        <TopBar customer={customer} setView={setView} />
        {view === 'dashboard' && (
        <div className="mb-4 flex justify-end">
          <button 
            onClick={handleCheckout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Checkout ({cart.length})
          </button>
        </div>
      )}
        

        {/* Views */}
        {/* {!customer && view === 'dashboard' && (
          <CustomerForm 
            formData={formData}
            setCustomer={setCustomer}
            handleChange={handleChange}
          />
        )}  */}

        {view === 'dashboard' && (
          <MenuGrid 
            menu={sampleMenu} 
            addToCart={addToCart} 
            cartCount={cart.length} 
            //handleCheckout={handleCheckout} 
          />
        )}

        {view === 'profile' && (
          <ProfileForm 
            formData={formData}
            handleChange={handleChange}
            setCustomer={setCustomer}
            setView={setView}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView 
            cart={cart}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
