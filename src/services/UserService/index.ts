import { ApiResponse, ApiResponseDetail, commonRequest } from "@/commons/req";
import { Role } from "@/types/enum";
import axios from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export interface BodyUser {
    email?: string;
    password?: string;
    name?: string;
    phoneNumber?: string;
}

export interface BodyLoginUser {
    email: string;
    password: string;
}

export interface ResponseLogin {
    access_token: string;
}

export interface User {
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

export interface ResponseHistoryLogin {
    _id: string,
    loginTime: Date,
    ipAddress: string,
    deviceInfo: string,
    userId: string,
    isSuccessful: boolean
}

export type ApiError = {
    status: number;  // The HTTP status code, e.g., 401
    message: string; // A high-level message, e.g., 'Token validation failed'
    data?: {
        message: string;  // Detailed error message, e.g., 'Token validation failed'
        error: string;    // The error type, e.g., 'Unauthorized'
        statusCode: number; // HTTP status code (should match the outer status)
    };
};
export function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}
const UserService = {
    createdUser: async (data: BodyUser): Promise<ApiResponseDetail<User>> => {
        try {
            const response = await commonRequest("post", `${API_URL}/users`, data);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (
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
    },
    getDetail: async (token: string): Promise<ApiResponseDetail<User>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/users/detail`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error: any) {
            if (isApiError(error)) {
                if (error.status === 401) {
                    throw error;
                } else {
                    throw error
                }
            } else {
                // Handle unexpected error types
                throw new Error('An unexpected error occurred');
            }
        }

    },
    updateProfile: async (data: BodyUser, token: string) => {
        try {
            const response = await commonRequest('patch', `${API_URL}/users`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
    getHistoryLogin: async (token: string): Promise<ApiResponse<ResponseHistoryLogin>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/loginHistory`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data
        } catch (error: unknown) {
            if (isApiError(error)) {
                if (error.status === 401) {
                    throw error;
                } else {
                    throw new Error(error.message || 'Failed to fetch login history');
                }
            } else {
                // Handle unexpected error types
                throw new Error('An unexpected error occurred');
            }
        }
    },
    logout: async (token: string): Promise<void> => {
        try {
            const response = await commonRequest("post", `${API_URL}/users/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default UserService;