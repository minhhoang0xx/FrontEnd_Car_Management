import HomePage from "../pages/Car/HomePage.js";
import AddPage from "../pages/Car/AddPage.js";
import UpdatePage from "../pages/Car/UpdatePage.js";
import DriverListPage from "../pages/Driver/DriverListPage.js";
import CreateDriverPage from "../pages/Driver/CreateDriverPage.js";
import UpdateDriverPage from "../pages/Driver/UpdateDriverPage.js";


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
    {
        path: '/updateDriver/:id',
        page: UpdateDriverPage,
    },
    {
        path: '/createDriver',
        page: CreateDriverPage,
    },
    {
        path: '/driverList',
        page: DriverListPage,
    },

]   