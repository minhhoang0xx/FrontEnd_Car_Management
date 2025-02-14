import HomePage from "../pages/Car/HomePage.js";
import AddPage from "../pages/Car/AddPage.js";
import UpdatePage from "../pages/Car/UpdatePage.js";


export const routes =[
    {
        path: '/',
        page: HomePage,
    },
    {
        path: '/addCar',
        page: AddPage,
    },
    {
        path: '/updateCar/:id',
        page: UpdatePage,
    },

]   