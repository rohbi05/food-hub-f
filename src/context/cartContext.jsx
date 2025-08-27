import { useEffect, useState, createContext, useContext } from "react";
import CartService from "../api/services/cart";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCart = async () => {
        try {
            const storedCartId = localStorage.getItem("cartID");
            if (storedCartId) {
                const cartData = await CartService.GetCart(storedCartId);
                setCart(cartData);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchCart();
    }, []);
    
    const createCart = async () => {
        try {
        const newCart = await CartService.CreateCart();
        localStorage.setItem("cartID", newCart.id);
        setCart(newCart);
        return newCart;
        } catch (error) {
        console.error("Failed to create cart:", error);
        throw error;
        }
    };
    const addCartItem = async (foodItemId, quantity = 1) => {
            if (!cart || !cart.id) {
            throw new Error("Cart not ready");
            }
            const newItem = await CartService.AddCartItem({
            cart: cart.id,
            food_item: foodItemId,
            quantity,
            });

            // Update cart state
            setCart((prev) => ({
            ...prev,
            items: [...(prev?.items || []), newItem],
            }));
            return newItem;
    };
    
    const updateCartItem = async (itemId, cartData) => {
        try {
        if (!cart || !cart.id) throw new Error("No cart to update");
        const updatedCart = await CartService.UpdateCartItem(itemId, cartData);
        setCart(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, ...cartData } : item
            )
        }));
        return updatedCart;
        } catch (error) {
        console.error("Failed to update cart:", error);
        throw error;
        }
    };
    
    const deleteCartItem = async (itemId) => {
        try {
            await CartService.DeleteCartItem(itemId);
            setCart(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== itemId)
            }));
        } catch (error) {
            console.error("Failed to delete cart item:", error);
            throw error;
        }
    };
    const checkout = async () => {
        try {
            const order = await CartService.CheckOut();
            setCart(null);
            localStorage.removeItem("cartID");
            return order;
        } catch (error) {
            console.error("Checkout failed:", error);
            throw error;
        }
    };
    
    return (
        <CartContext.Provider value={{ cart, setCart, loading, createCart, addCartItem, updateCartItem, deleteCartItem, checkout}}>
        {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);