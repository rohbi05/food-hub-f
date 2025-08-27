import React, { useState,  useEffect } from 'react';
import TopBar from './TopBar';
import MenuGrid from './MenuGrid';
import ProfileForm from './ProfileForm';
import CheckoutView from './CheckoutView';
import { useMenu } from '../context/menuContext';
import { useCart } from '../context/cartContext';


const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [view, setView] = useState('dashboard');
  const {cart, setCart, createCart, addCartItem, updateCartItem, deleteCartItem, checkout } = useCart();
  const { fetchMenuItems, menuItems, setMenuItems } = useMenu();

  // useEffect(() => {
  //     const loadMenu = async () => {
  //       const data = await fetchMenuItems();
  //       if (data) setMenu(data);
  //     };
  //     loadMenu();
  // }, []);

  useEffect(() => {
    const loadMenuAndCart = async () => {
      const data = await fetchMenuItems();
      if (data) setMenuItems(data);

      // Ensure a cart exists
      if (!cart) {
        await createCart(); // this will create and set the cart in context
      }
    };
    loadMenuAndCart();
  }, []);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addToCart = async (item) => {
      try {
        await addCartItem(item.id);
      } catch (err) {
        console.error("Failed to add to cart:", err);
        alert("Could not add item to cart");
      }
  };


  const handleCheckout = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return alert("Your cart is empty!");
    }

    try {
      const order = await checkout(); // calls CartService.CheckOut and clears cart
      setView("checkout");
      // Optionally pass the order info to CheckoutView if you want to show order summary
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Could not checkout");
    }
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
            count={cart?.items?.length || 0}
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
            menu={menuItems} 
            addToCart={addToCart} 
            // cartCount={c} 
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
