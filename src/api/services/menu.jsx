import api from '../axios';

const MenuService = {
    async CreateFoodItem(data){
        try{
            const formData = new FormData();
            formData.append('image', data.image);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);
            formData.append('available', data.available);
            const response = await api.post("/food-items/create/", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            return response.data;
            
        }catch(error){
            console.error("Create food item failed:", error);
            throw error;
        }
    },
    async RetailerFoodItemslist(){
        try{
            const response = await api.get("/retailer/food-items/");
            return response.data;
        }catch(error){
            console.error("Unable to fetch retailer's menu", error);
            throw error;
        }
    },
    async FoodItemsList(){
        try{
            const response = await api.get("/food-items/");
            return response.data;
        }catch(error){
            console.error("Unable to fetch menu", error);
            throw error;
        }
    },
    async UpdateFoodItem(id, data){
        try{
            const response = await api.patch(`/food-items/${id}/update/`, data);
            return response.data;
        }catch(error){
            console.error("Unable to update retailer's menu", error);
            throw error;
        }
    },
    async DeleteFoodItem(id){
        try{
            const response = await api.delete(`/food-items/${id}/delete/`);
            return response.data;
        }catch(error){
            console.error("Unable to delete retailer's menu", error);
            throw error;
        }
    }
}

export default MenuService;