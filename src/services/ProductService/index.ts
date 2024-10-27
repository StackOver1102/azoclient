import { ApiResponseDetail, commonRequest } from "@/commons/req";
import { API_URL } from "../UserService";

export interface Product {
    _id: string,
    label: string,
    max: number,
    min: number,
    origin: string,
    platform: string,
    rate: number,
    refill: boolean,
    value: string,
    description?: string
}
export interface ResponseProduct {
    _id: string,
    products: Product[]
}

const ProductService = {
    fetchProducts: async () => {
        try {
            const response = await commonRequest('get', `${API_URL}/products`);
            return response.data.data;
        } catch (error) {  
            throw error;
        }
    },
    getDetail: async (id: string): Promise<ApiResponseDetail<Product>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/products/${id}`, {}, {})
            return response.data
        } catch (error) {
            throw error
        }
    }
};

export default ProductService;
