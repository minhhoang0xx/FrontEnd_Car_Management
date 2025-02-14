
import * as CarService from "../../services/CarService"
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
const columns =(navigate, handleDelete) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Biển Số Xe',
        dataIndex: 'bien_So_Xe',
        key: 'bien_So_Xe',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Loại Xe',
        dataIndex: 'loai_Xe',
        key: 'loai_Xe',
    },
    {
        title: 'Ngày Tạo',
        dataIndex: 'ngay_Tao',
        key: 'ngay_Tao',
        render: (date) => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A',
    },
    {
        title: 'rạng Thái',
        key: 'trang_Thai',
        dataIndex: 'trang_Thai',
        render: (tag) => {
            if (!tag) return <Tag color="default">N/A</Tag>;
            const color = tag.toUpperCase() === 'USED' ? 'red' : 'green';
            const text = tag.toUpperCase() === 'USED' ? 'USED' : 'NEW';
            return <Tag color={color}>{text}</Tag>;
        }
    },
    {
        title: 'Thao Tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => navigate(`/updateCar/${record.id}`)}>Update</a>
                <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
        ),
    },
];
const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // khoi tao state luu data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cars = await CarService.getAllCar();
                console.log("Data từ API:", cars);
                setData(cars.map(car => ({ ...car, key: car.ID }))); 
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            }
        };
        fetchData(); // goi luon
    }, []); // chi chay 1 lan
    const handleDelete = async (id) => {
        try {
            await CarService.deleteCar(id); 
            setData(prevData => prevData.filter(car => car.id !== id));
        } catch (error) {
            console.error("Failed to delete car:", error);
        }
    };
    return (
        <div style={{ padding: '60px', background: '#f5f5f5', height: '100vh' }}>
            <div>
                <Button type="primary" onClick={() => navigate('/addCar')}>
                    + Add New Car
                </Button>
            </div>

            <Table columns={columns(navigate, handleDelete)} dataSource={data} />

        </div>
    )
}
export default HomePage;