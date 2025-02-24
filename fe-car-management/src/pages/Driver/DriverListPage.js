import * as CarService from "../../services/CarService"
import * as DriverService from "../../services/DriverService"
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
        title: 'Tên Tài Xế',
        dataIndex: 'username',
        key: 'username',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Xe',
        dataIndex: 'carName',
        key: 'carName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Thời Gian Tạo',
        dataIndex: 'd_Thoi_Gian_Tao',
        key: 'd_Thoi_Gian_Tao',
        render: (date) => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A',
    },
    {
        title: 'Trạng Thái',
        key: 'd_Trang_Thai',
        dataIndex: 'd_Trang_Thai',
        render: (tag) => {
            if (!tag) return <Tag color="default">N/A</Tag>;
            const color = tag.toUpperCase() === 'DISABLE' ? 'red' : 'green';
            const text = tag.toUpperCase() === 'DISABLE' ? 'DISABLE' : 'ENABLE';
            return <Tag color={color}>{text}</Tag>;
        }
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => navigate(`/updateDriver/${record.id}`)}>Update</a>
                <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
        ),
    },
];

const DriverListPage  = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // khoi tao state luu data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const drivers = await DriverService.getAllDriver();
                console.log("Data từ API:", drivers);
                setData(drivers.map(driver => ({ ...driver, key: driver.ID}))); 
                
            } catch (error) {
                console.error("Failed to fetch:", error);
            }
        };
        fetchData(); // goi luon
    }, []); // chi chay 1 lan
    const handleDelete = async (id) => {
        try {
            await DriverService.deletDriver(id); 
            setData(prevData => prevData.filter(driver => driver.id !== id));
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };
    return(
        <div style={{ padding: '60px', background: '#f5f5f5', height: '100vh' }}>
            <div>
                <Button type="primary" onClick={() => navigate('/createDriver')}>
                    + Create Driver
                </Button>
            </div>

            <Table columns={columns(navigate, handleDelete)} dataSource={data} />

        </div>
    )
};
export default DriverListPage;