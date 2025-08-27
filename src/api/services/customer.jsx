import api from '../axios'

const CustomerService = {
    async createCustomer(profileData){
        try {
            const token = localStorage.getItem('accessToken');
            console.log(token);
            const formData = new FormData();
            formData.append('phone', profileData.phone);
            formData.append('image', profileData.image);
            const response = await api.post("/customer-profile-create/", formData, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }});
            localStorage.setItem('customerID', response.data.id)
            console.log(localStorage.getItem('customerID'))
            return response.data;
        } catch (error) {
            console.error("Create retailer failed:", error);
            throw error;
        }
    },
    async updateCustomer(id, profileData){
        try{
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
            const response = await api.patch(`customer-profile-update/${id}/`, formData);
            return response.data;
        } catch (error) {
            console.error("Update customer failed:", error);
            throw error;
        }
        }catch(error){
            console.error("Update customer failed:", error);
            throw error;
        }
    },
    async getCustomer(){
        try{
            const response = await api.get(`/customer-profile-update/`);
            return response.data;
        }catch(error){
            console.error("Unable to fetch customer:", error);
            throw error;
        }
    }
}

export default CustomerService;

