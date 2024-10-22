import { StatusEnum } from "./enum";

export interface ApiResponse<T> {
  success: StatusEnum;  
  message?: string;     
  data?: T;             
  error?: string;       
}