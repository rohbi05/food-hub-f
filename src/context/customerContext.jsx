import {useState, useEffect, createContext, useContext} from "react";
import CustomerService from "../api/services/customer";
import { useAuth } from "../context/authContext"

const CustomerContext = createContext();

export const CustomerProvider = ({children}) =>{
    const [customerProfile, setCustomerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            if (user && user.role === 'customer') {
                try {
                    const id = localStorage.getItem('customerID')
                    const profile = await CustomerService.getCustomer();
                    setCustomerProfile(profile);
                    return profile;
                } catch (error) {
                    console.error("Failed to fetch customer profile:", error);
                }
            }
            setLoading(false);
        };
        fetchCustomerProfile();
    }, [user]);
    const createCustomerProfile = async (profileData) => {
        try {
            const profile = await CustomerService.createCustomer(profileData);
            setCustomerProfile(profile);
            localStorage.setItem('customerID', profile.id)
            console.log(localStorage.getItem('customerID'))
            const token = localStorage.getItem('accessToken')
            console.log(token)
            return profile;
        } catch (error) {
            console.error("Failed to create customer profile:", error);
            throw error;
        }
    };
    const updateCustomerProfile = async (profileData) => {
        try {
            const id = localStorage.getItem('customerID')
            const updatedProfile = await CustomerService.updateCustomer(id, profileData);
            setCustomerProfile(updatedProfile);
            return updatedProfile;
        } catch (error) {
            console.error("Failed to update retailer profile:", error);
            throw error;
        }
    };
    return (
        <CustomerContext.Provider value={{ customerProfile, loading, createCustomerProfile, updateCustomerProfile, setCustomerProfile }}>
            {children}
        </CustomerContext.Provider>
    );
}

export const useCustomer = () => useContext(CustomerContext)