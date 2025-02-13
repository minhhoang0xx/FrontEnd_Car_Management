import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import * as CarService from "../../services/CarService";
import dayjs from "dayjs";

const { Option } = Select;

const UpdatePage = () => {
    const { carId } = useParams(); // Lấy ID xe từ URL
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const car = await CarService.getCar(carId);
                if (car) {
                    form.setFieldsValue({
                        Bien_So_Xe: car.Bien_So_Xe,
                        Loai_Xe: car.Loai_Xe,
                        Ngay_Tao: dayjs(car.Ngay_Tao), 
                        Trang_Thai: car.Trang_Thai,
                    });
                }
            } catch (error) {
                message.error("fail");
            }
        };
        fetchCar();
    }, [carId, form]);

    const handleUpdate = async (values) => {
        try {
            setLoading(true);
            const updatedCar = {
                ...values,
                Ngay_Tao: values.Ngay_Tao.format("YYYY-MM-DD"), // Chuyển Date về chuỗi
            };
            await CarService.updateCar(carId, updatedCar);
            message.success("Success");
            navigate("/"); 
        } catch (error) {
            message.error("FailFail");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
            <h2>Cập Nhật Xe</h2>
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
                <Form.Item
                    label="Biển Số Xe"
                    name="Bien_So_Xe"
                    rules={[{ required: true, message: "Nhập..." }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Loại Xe"
                    name="Loai_Xe"
                    rules={[{ required: true, message: "Nhập..." }]}
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
                    label="Trạng Thái"
                    name="Trang_Thai"
                    rules={[{ required: true, message: "Nhập..." }]}
                >
                    <Select>
                        <Option value="NEW">NEW</Option>
                        <Option value="USED">USED</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                    <Button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
                        Cancle
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdatePage;
