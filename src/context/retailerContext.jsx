import React from "react";
import {useState, useEffect, createContext, useContext} from "react";
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
                    const id = localStorage.getItem('retailerID')
                    const profile = await RetailerService.getRetailerById(id);
                    setRetailerProfile(profile);
                    return profile;
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
            // localStorage.setItem('retailerID', profile.data.id)
            console.log(localStorage.getItem('retailerID'))
            const token = localStorage.getItem('accessToken')
            console.log(token)
            return profile;
        } catch (error) {
            console.error("Failed to create retailer profile:", error);
            throw error;
        }
    };
    const updateRetailerProfile = async (profileData) => {
        try {
            const id = localStorage.getItem('retailerID')
            const updatedProfile = await RetailerService.updateRetailer(id, profileData);
            setRetailerProfile(updatedProfile);
            return updatedProfile;
        } catch (error) {
            console.error("Failed to update retailer profile:", error);
            throw error;
        }
    };
    return (
        <RetailerContext.Provider value={{ retailerProfile, loading, createRetailerProfile, updateRetailerProfile, setRetailerProfile }}>
            {children}
        </RetailerContext.Provider>
    );
}

export const useRetailer = () => useContext(RetailerContext)