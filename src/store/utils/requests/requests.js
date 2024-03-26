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

export const carsDataAsyncRequest = async (bodyParams) => {
    // return await instance.get("CarChargingStatus" + mapQueryParams(data));  
    return await instance.post("CarChargingStatus", JSON.stringify(bodyParams))
} 

export const getInfrastructureDataAsyncRequest = async () => { 
  return await instance.get("InfrastructureData");
} 

export const addInfrastructureDataAsyncRequest = async (bodyParams) => { 
  return await instance.post("InfrastructureData", JSON.stringify(bodyParams))
} 

export const updateInfrastructureDataAsyncRequest = async (bodyParams) => { 
  return await instance.put("InfrastructureData", JSON.stringify(bodyParams))
} 