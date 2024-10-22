import { Role } from "@/types/enum";
import axios from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export interface BodyCreateUser {
    email: string;
    password: string;
    name: string;
}

export interface BodyLoginUser {
    email: string;
    password: string;
}

export interface ResponseLogin {
    access_token: string;
}

export interface User{
    _id: string
    email: string;
    age: number;
    address: string;
    role: Role;
    tokenVersion: number;
    apiKey: string;
    money: number;
    phonenumber: string;
}

export const createdUser = async (data: BodyCreateUser): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/users`, data);

        if (response.status === 201 || response.status === 200) {
            return;
        } else {
            throw new Error("Failed to create user");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const loginUser = async (
    data: BodyLoginUser
): Promise<ResponseLogin> => {
    try {
        const result = await axios.post(`${API_URL}/users/login`, data);
        return result.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data?.message || "Bad Request";
                throw new Error(errorMessage);
            } else {
                throw new Error("Failed to login");
            }
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

export const getDetail = async (token: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/users/detail`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new Error('401 Unauthorized: Invalid or expired token');
        }

        console.error('Error fetching details:', error);
        throw new Error('Failed to fetch details');
    }

};
