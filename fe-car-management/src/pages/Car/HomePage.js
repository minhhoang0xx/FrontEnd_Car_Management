
import * as CarService from "../../services/CarService"
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
const columns =(navigate, handleDelete) => [
    {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
    },
    {
        title: 'Biển Số Xe',
        dataIndex: 'Bien_So_Xe',
        key: 'Bien_So_Xe',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Loại Xe',
        dataIndex: 'Loai_Xe',
        key: 'Loai_Xe',
    },
    {
        title: 'Ngày Tạo',
        dataIndex: 'Ngay_Tao',
        key: 'Ngay_Tao',
    },
    {
        title: 'Trạng Thái',
        key: 'Trang_Thai',
        dataIndex: 'Trang_Thai',
        render: (tag) => {
            let color = tag === 'USED' ? 'volcano' : 'green';
            return <Tag color={color}>{tag.toUpperCase()}</Tag>;
        },
    },
    {
        title: 'Thao Tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => navigate(`/updateCar/${record.ID}`)}>Update</a>
                <a onClick={() => handleDelete(record.ID)}>Delete</a>
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
                console.log("ENV", process.env.REACT_APP_API_URL)
                const cars = await CarService.getAllCar();
                setData(cars); //cap nhat state
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            }
        };
        fetchData(); // goi luon
    }, []); // chi chay 1 lan
    const handleDelete = async (id) => {
        try {
            await CarService.deleteCar(id); 
            setData(prevData => prevData.filter(car => car.ID !== id));
        } catch (error) {
            console.error("Failed to delete car:", error);
        }
    };
    return (
        <div style={{ padding: '60px', background: '#f5f5f5', height: '100vh' }}>
            <div>
                <Button type="primary" onClick={() => navigate('/addCar')}>
                    Add New Car
                </Button>
            </div>

            <Table columns={columns(navigate, handleDelete)} dataSource={data} />

        </div>
    )
}
export default HomePage;