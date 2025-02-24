import React from 'react';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import * as CarService from '../../services/CarService';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const AddPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {

        try {
            console.log('Values1', values);
            values.Ngay_Tao = values.Ngay_Tao.format('YYYY-MM-DD'); 
            console.log('Values2', values.Ngay_Tao);
            await CarService.addCar(values);
            message.success('Car added successfully!');
            form.resetFields(); // reset Form
        } catch (error) {
            console.error('err',error.response);
            message.error('Failed to add car.');
        }
    };

    return (
        
        <div style={{ padding: '10px 60px', background: '#f5f5f5', height: '100vh' }}>
            <Button onClick={() => navigate("/")}>
                Car List
            </Button>
       
            <h1 style={{textAlign:'center'}}>ADD NEW CAR</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="Bien_So_Xe"
                    label="Biển Số Xe"
                    rules={[{ required: true, message: 'nhap..' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Loai_Xe"
                    label="Loại Xe"
                    rules={[{ required: true, message: 'nhap..' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Ngay_Tao"
                    label="Ngày Tạo"
                    rules={[{ required: true, message: 'Nhập ngày tạo' }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="Trang_Thai"
                    label="Trạng Thái"
                    rules={[{ required: true, message: 'nhap..' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="NEW">NEW</Option>
                        <Option value="USED">USED</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Car
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddPage;