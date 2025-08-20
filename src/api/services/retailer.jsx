import api from '../axios';

    const RetailerService = {
        async createRetailer (profileData){
        try {
            const token = localStorage.getItem('accessToken');
            console.log(token);
            const formData = new FormData();
            formData.append('restaurant_name', profileData.restaurant_name);
            formData.append('restaurant_image', profileData.restaurant_image);
            formData.append('restaurant_address', profileData.restaurant_address);
            formData.append('restaurant_phone', profileData.restaurant_phone);
            formData.append('restaurant_email', profileData.restaurant_email);
            formData.append('document_good_conduct', profileData.document_good_conduct);
            formData.append('document_food_hygiene', profileData.document_food_hygiene);
            const response = await api.post("/retailer-profile-create/", formData, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }});
            localStorage.setItem('retailerID', response.data.id)
            console.log(localStorage.getItem('retailerID'))
            return response.data;
        } catch (error) {
            console.error("Create retailer failed:", error);
            throw error;
        }
    },
    async getRetailers () {
        try {
            const response = await api.get("/retailer-profiles/");
            return response.data;
        } catch (error) {
            console.error("Get retailers failed:", error);
            throw error;
        }
    },
    async getRetailerById (id) {
        try {
            const response = await api.get(`/retailer-profile-update/${id}/`);
            return response.data;
        } catch (error) {
            console.error("Get retailer by ID failed:", error);
            throw error;
        }
   },
    async updateRetailer (id, profileData) {
        try {
            const formData = new FormData();
           
            // Only append fields that are being updated.
            for (const key in profileData) {
            // Check if the value is a File object to handle correctly
            if (profileData[key] instanceof File) {
                formData.append(key, profileData[key]);
            } else {
                formData.append(key, profileData[key]);
            }
            }
            const response = await api.patch(`retailer-profile-update/${id}/`, formData);
            return response.data;
        } catch (error) {
            console.error("Update retailer failed:", error);
            throw error;
        }
    }
}

export default RetailerService;