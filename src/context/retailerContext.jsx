import React from "react";
import {useState, useEffect, createContext, useContext} from React
import RetailerService from "../api/services/retailer";
import { useAuth } from "../context/authContext"

const RetailerContext = createContext();

export const RetailerProvider = ({children}) =>{
    const [retailerProfile, setRetailerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRetailerProfile = async () => {
            if (user && user.role === 'retailer') {
                try {
                    const profile = await RetailerService.getRetailerProfile(user.id);
                    setRetailerProfile(profile);
                } catch (error) {
                    console.error("Failed to fetch retailer profile:", error);
                }
            }
            setLoading(false);
        };
        fetchRetailerProfile();
    }, [user]);
    const createRetailerProfile = async (profileData) => {
        try {
            const profile = await RetailerService.createRetailer(profileData);
            setRetailerProfile(profile);
            return profile;
        } catch (error) {
            console.error("Failed to create retailer profile:", error);
            throw error;
        }
    };
    const updateRetailerProfile = async (profileData) => {
        try {
            const updatedProfile = await RetailerService.updateRetailer(user.id, profileData);
            setRetailerProfile(updatedProfile);
            return updatedProfile;
        } catch (error) {
            console.error("Failed to update retailer profile:", error);
            throw error;
        }
    };
    return (
        <RetailerContext.Provider value={{ retailerProfile, loading, createRetailerProfile, updateRetailerProfile }}>
            {children}
        </RetailerContext.Provider>
    );
}

export const useRetailer = () => useContext(RetailerContext)