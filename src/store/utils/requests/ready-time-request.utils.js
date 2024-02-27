import axios from 'axios';
import { mapQueryParams } from '../api-manager.utils';

const baseUrl = "https://localhost:7019/api/";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const readyTimeAsyncRequest = async (data) => {
    return await instance.get("CarChargingStatus" + mapQueryParams(data));  
} 
