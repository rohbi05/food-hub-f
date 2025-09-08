import {useState, useEffect, createContext, useContext} from "react";
import MenuService from "../api/services/menu";
import { useAuth } from "../context/authContext"
import { th } from "zod/locales";

const MenuContext = createContext();

export const MenuProvider = ({children}) =>{
    const [menuItems, setMenuItems] = useState([]);
    const [retailerMenu, setRetailerMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchMenuItems = async () => {
        try {
        if (user?.role === "customer") {
            const menu = await MenuService.FoodItemsList();
            setMenuItems(menu);
            return menu;
        } else {
            const menu = await MenuService.RetailerFoodItemslist();
            setRetailerMenu(menu);
            return menu;
        }
        } catch (error) {
        console.error("Failed to fetch menu:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchMenuItems();
    }, [user]);
    const createMenu = async (data) => {
        try {
            //Create new food item
            await MenuService.CreateFoodItem(data);
            //Update the menu to include the newly created food item
            const updatedMenu = await MenuService.RetailerFoodItemslist();
            setRetailerMenu(updatedMenu);
        } catch (error) {
            console.error("Failed to create menu:", error);
            throw error;
        }
    };
    const UpdateMenuItem = async(id, data) => {
        try{
            const response = await MenuService.UpdateFoodItem(id, data);
            return response;
        }catch(error){
            console.error("Failed to delete", error);
            throw error;
        }
    };
    const deleteMenuItem = async(id) => {
        try{
            const response = await MenuService.DeleteFoodItem(id);
            setRetailerMenu((prev) => prev.filter((item) => item.id !== id));
            return response;
        }catch(error){
            console.error("Failed to delete", error);
            throw error;
        }
    };
    
    return (
        <MenuContext.Provider value={{ menuItems, setMenuItems, loading, createMenu, retailerMenu, setRetailerMenu, fetchMenuItems, UpdateMenuItem, deleteMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = () => useContext(MenuContext)