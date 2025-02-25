import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as CarService from "../../services/CarService";
import * as DriverService from "../../services/DriverService";
import dayjs from "dayjs";

const { Option } = Select;

const UpdateDriverPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCars();
        fetchDriverDetails();
    }, []);

    const fetchCars = async () => {
        try {
            const cars = await CarService.getAllCar();
            setCarList(cars.$values);
            console.log("cars", cars)
        } catch (error) {
            message.error("Không thể lấy danh sách xe.");
        }
    };

    const fetchDriverDetails = async () => {
        try {
            const driver = await DriverService.getDriver(id);
            form.setFieldsValue({
                username: driver.username,
                Thoi_Gian_Tao: dayjs(driver.d_Thoi_Gian_Tao),
                Trang_Thai: driver.d_Trang_Thai,
                ListCarId: driver.listCarId.$values
                
            });
            console.log("driver", driver)
        } catch (error) {
            message.error("Không thể lấy thông tin tài xế.");
            navigate("/driverList");
        }
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const updatedDriver = {
                id,
                username: values.username,
                D_Thoi_Gian_Tao: values.Thoi_Gian_Tao.format("YYYY-MM-DD"),
                D_Trang_Thai: values.Trang_Thai,
                ListCarId: values.ListCarId
            };
            await DriverService.updateDriver(id, updatedDriver);
            message.success("Cập nhật tài xế thành công!");
            navigate("/driverList");
        } catch (error) {
            message.error("Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "10px 60px", background: "#f5f5f5", height: "100vh" }}>
            <Button onClick={() => navigate("/driverList")}>Quay lại</Button>
            <h1 style={{ textAlign: "center" }}>Update Driver</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="username" label="Tên Tài Xế" rules={[{ required: true, message: "Nhập" }]}> 
                    <Input />
                </Form.Item>
                <Form.Item name="Thoi_Gian_Tao" label="Thời gian tạo" rules={[{ required: true, message: "Nhập" }]}> 
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="Trang_Thai" label="Trạng Thái" rules={[{ required: true, message: "Chọn" }]}> 
                    <Select placeholder="Chọn trạng thái">
                        <Option value="ENABLE">ENABLE</Option>
                        <Option value="DISABLE">DISABLE</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="ListCarId" label="Chọn Xe" rules={[{ required: false, message: "Chọn ít nhất một xe", type: "array" }]}> 
                    <Select mode="multiple" placeholder="Chọn xe">
                        {carList.map(car => (
                            <Option key={car.id} value={car.id}>
                                {car.bien_So_Xe} - {car.loai_Xe} - {car.trang_Thai}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateDriverPage;
