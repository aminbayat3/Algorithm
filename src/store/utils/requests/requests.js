import axios from 'axios';
import { mapQueryParams } from '../api-manager.utils';

const baseUrl = "https://qualitychargingbackend.azurewebsites.net/api/";
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

// infrastructure requests

export const getInfrastructureDataAsyncRequest = async () => { 
  return await instance.get("InfrastructureData");
} 
export const addInfrastructureDataAsyncRequest = async (bodyParams) => { 
  return await instance.post("InfrastructureData", JSON.stringify(bodyParams))
} 
export const updateInfrastructureDataAsyncRequest = async (bodyParams) => { 
  return await instance.put("InfrastructureData", JSON.stringify(bodyParams))
} 

//reservation requests

export const getReservationsAsyncRequest = async () => { 
  return await instance.get("Reservations");
} 
export const addReservationsAsyncRequest = async (bodyParams) => {
  return await instance.post("Reservations", JSON.stringify(bodyParams))
}

export const deleteReservationAsyncRequest = async (id) => {
  console.log('id', id)
  return await instance.delete(`Reservations/${id}`);
}
