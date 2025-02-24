import axios from 'axios';
export const axiosJWT = axios.create(); 

export const getAllDriver = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Driver/getAllDriver`);
    return res.data; 
}
export const getDriver = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Driver/getDriver/${id}`);
    return res.data; 
}
export const createDriver = async (values) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/Driver/addDriver`, values);
    return res.data; 
}
export const deletDriver = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Driver/deleteDriver/${id}`);
    return res.data; 
}
export const updateDriver = async (id,values) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/Driver/updateDriver/${id}`, values);
    return res.data; 
}
export const updateCarOfDriver = async (id,values) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/Driver/updateCarOfDriver/${id}`, values);
    return res.data; 
}  