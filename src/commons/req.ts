import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiResponse<T> = {
  success: string;    // This could also be typed as a literal 'success' if it's always this value
  message: string;    // Descriptive message about the operation
  data?: T[];            // The actual data, which could be an array or an object depending on the API
};

export type ApiResponseDetail<T> = {
  success: string;    // This could also be typed as a literal 'success' if it's always this value
  message: string;    // Descriptive message about the operation
  data:  T;            // The actual data, which could be an array or an object depending on the API
};

export type CustomError = {
  status: number | null;
  message: string;
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const commonRequest = async (
  method: 'get' | 'post' | 'put' | 'patch',
  url: string,
  data?: Record<string, any>,  // eslint-disable-line @typescript-eslint/no-explicit-any
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    if (error.response) {

      // Tạo một đối tượng lỗi tùy chỉnh với status code và message
      const statusCode = error.response.status;
      const customError: CustomError = {
        status: statusCode,
        message: error.response.data?.message || "An error occurred",
        data: error.response.data || null,
      };

      // Throw the custom error based on the status code
      switch (statusCode) {
        case 400:
        case 401:
        case 500:
          throw customError;
        default:
          throw customError;
      }
    } else if (error.request) {
      console.error('No response received: ', error.request);
      throw {
        status: null,
        message: 'No response: Không có phản hồi từ máy chủ',
        data: null,
      } as CustomError;
    } else {
      console.error('Error setting up request: ', error.message);
      throw {
        status: null,
        message: `Request Error: ${error.message}`,
        data: null,
      } as CustomError;
    }
  }
};
