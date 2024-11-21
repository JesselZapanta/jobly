import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Button,
    Form,
    Modal,
    Input,
    Table,
    Space,
    notification,
    Row,
    Pagination,
    Dropdown,
} from "antd";
import {
    MailOutlined,
    LockOutlined,
    UserOutlined,
    UserAddOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import Search from "antd/es/input/Search";

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const getData = async () => {
        setLoading(true);

        const params = [`page=${page}`, `search=${search}`].join("&");

        try {
            const res = await axios.get(`/admin/user/getData?${params}`);

            // console.log(res.data);
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(page);
    }, [page]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };

    //modals and forms
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const showCreateModal = () => {
        setUser(null);
        setIsModalOpen(true);
        form.setFieldsValue({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
    };

    const showEditModal = (user) => {
        setUser(user);
        setIsModalOpen(true);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
        });
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (!user) {
            try {
                const res = await axios.post("/admin/user/store", values);

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
            } catch (err) {
                // console.log(err);
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.put(
                    `/admin/user/update/${user.id}`,
                    values
                );

                if (res.data.status === "updated") {
                    setIsModalOpen(false);
                    form.resetFields();
                    setErrors({});
                    getData();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The user has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setErrors({});
        setUser(null);
    };

    const handleDelete = async (id) => {
        setProcessing(true);

        try {
            const res = await axios.delete(`/admin/user/delete/${id}`);

            if (res.data.status === "deleted") {
                getData();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The user has been deleted successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

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
                        </div>
                        {/* Table */}
                        <div className="px-4">
                            <div className="flex gap-2 mb-2">
                                <Search
                                    placeholder="Input name or email"
                                    allowClear
                                    enterButton="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    loading={loading}
                                    onSearch={getData}
                                />
                                
                                <Button
                                    type="primary"
                                    size="medium"
                                    onClick={showCreateModal}
                                    icon={<UserAddOutlined />}
                                >
                                    New
                                </Button>
                            </div>
                            <Table
                                loading={loading}
                                dataSource={data}
                                rowKey={(data) => data.id}
                                pagination={false}
                            >
                                <Column title="ID" dataIndex="id" key="id" />
                                <Column
                                    title="Name"
                                    dataIndex="name"
                                    key="name"
                                />
                                <Column
                                    title="Email"
                                    dataIndex="email"
                                    key="email"
                                />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(_, record) => (
                                        <Space>
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<EditOutlined />}
                                                onClick={() =>
                                                    showEditModal(record)
                                                }
                                            ></Button>
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
                                                            handleDelete(
                                                                record.id
                                                            );
                                                        },
                                                    })
                                                }
                                            />
                                        </Space>
                                    )}
                                />
                            </Table>
                            <div className="my-4">
                                <Pagination
                                    current={page}
                                    total={total}
                                    pageSize={10}
                                    onChange={(page) => setPage(page)}
                                    showSizeChanger={false}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <Modal
                        title={
                            user ? "EDIT USER INFORMATION" : "USER INFORMATION"
                        }
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout="vertical"
                            autoComplete="off"
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
                                    // size="large"
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
                                    // size="large"
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
                                    // size="large"
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
                                    // size="large"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Row justify="end">
                                <Space size="small">
                                    <Button
                                        type="default"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        icon={<UserAddOutlined />}
                                        disabled={processing}
                                        loading={processing}
                                    >
                                        {user ? "Update" : "Create"}
                                    </Button>
                                </Space>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
