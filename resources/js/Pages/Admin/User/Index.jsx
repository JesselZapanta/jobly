import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Form, Modal, Input, Table, Space, notification } from "antd";
import {
    MailOutlined,
    LockOutlined,
    UserOutlined,
    UserAddOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";

export default function Index() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        try {
            const res = await axios.get("/admin/user/getData");

            // console.log(res.data);
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };
    
    //modals and forms
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        try{
            const res = await axios.post("/admin/user/store", values)

            if (res.data.status === "created") {
                setIsModalOpen(false);
                form.resetFields();
                setErrors({});
                getData();
                openNotification(
                    "success",
                    "bottomRight",
                    "Created!",
                    "The user has been created successfully."
                );
            }

        }catch(err){
            // console.log(err);
            setErrors(err.response.data.errors);
        }finally{
            setProcessing(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setErrors({});
    };

    const handleDelete = async (id) => {
        setProcessing(true);

        try{
            const res = await axios.delete("/admin/user/delete/" + id);

            if(res.data.status === 'deleted'){
                getData();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The user has been deleted successfully."
                );
            };
        }catch(err){
            console.log(err)
        }finally{
            setProcessing(false);
        }
    }
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <Head title="Dashboard" />

            {contextHolder}

            <div className="pt-4 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between">
                            <div className="text-gray-900">List of Users</div>
                            <Button
                                type="primary"
                                size="medium"
                                onClick={showModal}
                                icon={<UserAddOutlined />}
                            >
                                New
                            </Button>
                        </div>
                        {/* Table */}
                        <Table
                            loading={loading}
                            dataSource={data}
                            rowKey={(data) => data.id}
                            className="px-4"
                        >
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column
                                title="Email"
                                dataIndex="email"
                                key="email"
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            onClick={() =>
                                                Modal.confirm({
                                                    title: "Delete?",
                                                    icon: (
                                                        <QuestionCircleOutlined />
                                                    ),
                                                    content:
                                                        "Are you sure you want to delete this data?",
                                                    okText: "Yes",
                                                    cancelText: "No",
                                                    onOk() {
                                                        handleDelete(record.id);
                                                    },
                                                })
                                            }
                                        />
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    {/* Modal */}
                    <Modal
                        title="USER INFORMATION"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            onFinishFailed={(errorInfo) => {
                                console.log(
                                    "Form submission failed:",
                                    errorInfo
                                );
                            }}
                            layout="vertical"
                            autoComplete="off"
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                password_confirmation: "",
                            }}
                        >
                            <Form.Item
                                label="NAME"
                                name="name"
                                // Custom error handling
                                validateStatus={errors?.name ? "error" : ""}
                                help={errors?.name ? errors.name[0] : ""}
                            >
                                <Input
                                    placeholder="Name"
                                    size="large"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="EMAIL"
                                name="email"
                                validateStatus={errors?.email ? "error" : ""}
                                help={errors?.email ? errors?.email[0] : ""}
                            >
                                <Input
                                    placeholder="Email"
                                    size="large"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="PASSWORD"
                                name="password"
                                validateStatus={errors?.password ? "error" : ""}
                                help={
                                    errors?.password ? errors?.password[0] : ""
                                }
                            >
                                <Input.Password
                                    placeholder="Password"
                                    type="password"
                                    size="large"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="RE-TYPE PASSWORD"
                                name="password_confirmation"
                                validateStatus={
                                    errors?.password_confirmation ? "error" : ""
                                }
                                help={
                                    errors?.password_confirmation
                                        ? errors?.password_confirmation[0]
                                        : ""
                                }
                            >
                                <Input.Password
                                    placeholder="Re-type Password"
                                    type="password"
                                    size="large"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Button
                                htmlType="submit"
                                type="primary"
                                icon={<UserAddOutlined />}
                                size="large"
                                block
                                disabled={processing}
                                loading={processing}
                            >
                                Create
                            </Button>
                        </Form>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
