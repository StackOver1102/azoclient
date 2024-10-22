import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const commonRequest = async (
  method: 'get' | 'post' | 'put' | 'patch',
  url: string,
  data?: Record<string, any>,
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
  } catch (error: any) {
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          console.error('Bad Request (400): ', error.response.data);
          throw new Error('Bad Request: Dữ liệu không hợp lệ');
        
        case 401:
          console.error('Unauthorized (401): ', error.response.data);
          throw new Error('Unauthorized: Bạn cần đăng nhập để thực hiện hành động này');
        
        case 500:
          console.error('Internal Server Error (500): ', error.response.data);
          throw new Error('Internal Server Error: Có lỗi xảy ra trên máy chủ');
        
        default:
          console.error(`Error ${statusCode}: `, error.response.data);
          throw new Error(`Error ${statusCode}: Đã xảy ra lỗi`);
      }
    } else if (error.request) {
      console.error('No response received: ', error.request);
      throw new Error('No response: Không có phản hồi từ máy chủ');
    } else {
      console.error('Error setting up request: ', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};
