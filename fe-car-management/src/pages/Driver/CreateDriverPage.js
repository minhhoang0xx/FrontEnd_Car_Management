import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as CarService from "../../services/CarService"
import * as DriverService from "../../services/DriverService"
const { Option } = Select

const CreateDriverPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [carList,setCarList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const cars = await CarService.getAllCar();
            // const data = await cars.json();
            const carFetch = cars.$values;
            setCarList(carFetch);
            console.log("carFetch", carFetch);

        } catch (error) {
            message.error('Car null');
        }
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            console.log("carid",values.ListCarId);
            console.log("values", values);
            const driverData = {
                username: values.username,
                D_Thoi_Gian_Tao: values.Thoi_Gian_Tao.format('YYYY-MM-DD'),
                D_Trang_Thai: values.Trang_Thai,
                ListCarId: values.ListCarId
            };
            console.log("deiverData", driverData)
            await DriverService.createDriver(driverData)

            message.success('Thêm tài xế thành công!');
            navigate('/driverList');
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '10px 60px', background: '#f5f5f5', height: '100vh' }}>
            <Button onClick={() => navigate("/driverList")}>
                Driver List
            </Button>

            <h1 style={{ textAlign: 'center' }}>ADD NEW DRIVER</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Tên Tài Xế"
                    rules={[{ required: true, message: 'nhap..' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Thoi_Gian_Tao"
                    label="Thời gian tạo"
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
                        <Option value="ENABLE">ENABLE</Option>
                        <Option value="DISABLE">DISABLE</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="ListCarId"
                    label="Chọn Xe"
                    rules={[{
                        required: false,
                        message: 'Vui lòng chọn ít nhất một xe',
                        type: 'array'
                    }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn một hoặc nhiều xe"
                        optionFilterProp="children"
                    >
                        {carList.map(car => (
                            <Option key={car.id} value={car.id}>
                                {car.bien_So_Xe} - {car.loai_Xe} - {car.trang_Thai}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Driver
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default CreateDriverPage;