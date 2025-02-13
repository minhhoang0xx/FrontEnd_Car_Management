import axios from 'axios';
export const axiosJWT = axios.create(); 

export const getAllCar = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Car/getAllCar`);
    return res.data; 
}
export const addCar = async (values) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/Car/addCar`, values);
    return res.data; 
}
export const getCar = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Car/getCar/${id}`);
    return res.data; 
}
export const updateCar = async (id,values) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/Car/updateCar/${id}`, values);
    return res.data; 
}
export const deleteCar = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Car/deleteCar/${id}`);
    return res.data; 
}