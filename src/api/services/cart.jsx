import api from '../axios';

const CartService = {
    async CreateCart(){
        try{
            const response = await api.post("/cart/");
            return response.data;
        }catch(error){
            console.error("Create cart failed:", error);
            throw error;
        }
   },
    async GetCart(id){
          try{
                const response = await api.get(`/cart/${id}/`);
                return response.data;
          }catch(error){
                console.error("Get cart failed:", error);
                throw error;
          }
    },
    async AddCartItem(item){
        try{
            const response = await api.post(`/cart-items/`, item);
            return response.data;
        }catch(error){
            console.error("Add cart item failed:", error.response?.data || error.message);
            throw error;
        }
    },
    async UpdateCartItem(id, data){
            try{
                    const response = await api.put(`/cart-items/${id}/`, data);
                    return response.data;

            }catch(error){
                    console.error("Update cart failed:", error);
                    throw error;
            }
   },
    async DeleteCartItem(id){
            try{
                    await api.delete(`/cart-items/${id}/`);
            }catch(error){
                    console.error("Delete cart failed:", error);
                    throw error;
            }
   },
   async CheckOut(){
        try{
            const response = await api.post(`/checkout/`);
            return response.data;
        }catch(error){
            console.error("Delete cart failed:", error);
            throw error;
        }
   }
};

export default CartService;