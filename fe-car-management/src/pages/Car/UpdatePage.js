import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import * as CarService from "../../services/CarService";
import dayjs from "dayjs";

const { Option } = Select;

const UpdatePage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                console.log("get Car1", id)
                const car = await CarService.getCar(id);
                console.log("get Car", car)
                if (car) {
                    form.setFieldsValue({
                        Bien_So_Xe: car.bien_So_Xe,
                        Loai_Xe: car.loai_Xe,
                        Ngay_Tao: dayjs(car.ngay_Tao), 
                        Trang_Thai: car.trang_Thai,
                    });
                }
            } catch (error) {
                message.error("fail");
            }
        };
        fetchCar();
    }, [id, form]);

    const handleUpdate = async (data) => {
        try {
            setLoading(true);
            const updatedCar = {
                ...data,
                Ngay_Tao: data.Ngay_Tao.format("YYYY-MM-DD"), // Chuyển Date về chuỗi
            };
            await CarService.updateCar(id, updatedCar);
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
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdatePage;
