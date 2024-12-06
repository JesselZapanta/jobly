import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Button,
    Divider,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
} from "antd";

import {
    PlusOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    EditOutlined,
    SolutionOutlined,
    DollarOutlined,
    BookOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TeamOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";
import axios from "axios";
import Column from "antd/es/table/Column";

export default function Index({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const getData = async (isSearch = false) => {
        setLoading(true);

        if (isSearch) {
            setSearching(true);
        }

        const params = [
            `page=${page}`,
            `search=${search}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/job/getData?${params}`);

            setData(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setSearching(false);
        }
    };

    //antd onchange table has 3 params
    const handleTableChange = (pagination, filters, sorter) => {
        setSortField(sorter.field || "id");
        setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
        setPage(pagination.current);
    };

    useEffect(() => {
        getData(false);
    }, [page, sortField, sortOrder]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };

    const [job, setJob] = useState(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const showViewModal = (job) => {
        setIsModalOpen(true);
        setJob(job);
        // console.log(job.job_title);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setJob(null);
    };

    const handleApproved = async (job) => {
        setProcessing(true);

        try {
            const res = await axios.post(`/admin/job/approved/${job.id}`);

            if (res.data.status === "approved") {
                getData();
                openNotification(
                    "success",
                    "bottomRight",
                    "Approved!",
                    "The job has been approved successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const res = await axios.delete(`/employer/job/delete/${id}`);

            if (res.data.status === "deleted") {
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleded!",
                    "The job has been deleted successfully."
                );
                getData(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(true);
        }
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Jobs
                </h2>
            }
            auth={auth}
        >
            <Head title="Jobs" />

            {/* <pre>{JSON.stringify(data, null, 2)}sda</pre> */}

            {contextHolder}

            <div className="pt-4 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between">
                            <div className="text-gray-900">List of Jobs</div>
                        </div>
                        {/* Table */}
                        <div className="px-4">
                            <div className="flex gap-2 mb-2">
                                <Search
                                    placeholder="Search Jobs"
                                    allowClear
                                    enterButton="Search"
                                    loading={searching}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onSearch={() => getData(true)}
                                />
                            </div>
                            <Table
                                loading={loading}
                                dataSource={data}
                                rowKey={(data) => data.id}
                                pagination={{
                                    current: page,
                                    total: total,
                                    pageSize: 10,
                                    showSizeChanger: false,
                                    onChange: (page) => setPage(page),
                                }}
                                onChange={handleTableChange}
                            >
                                <Column
                                    sorter={true}
                                    title="ID"
                                    dataIndex="id"
                                    key="id"
                                />

                                <Column
                                    sorter={true}
                                    title="Job Title"
                                    dataIndex="job_title"
                                    key="job_title"
                                />
                                <Column
                                    sorter={true}
                                    title="Industry"
                                    dataIndex="industry"
                                    key="industry"
                                />
                                <Column
                                    sorter={true}
                                    title="Job Type"
                                    dataIndex="job_type"
                                    key="job_type"
                                />
                                <Column
                                    sorter={true}
                                    title="Status"
                                    dataIndex="status"
                                    key="status"
                                    render={(_, record) =>
                                        record.status === 0 ? (
                                            <Tag color="yellow">Pending</Tag>
                                        ) : record.status === 1 ? (
                                            <Tag color="green">Approve</Tag>
                                        ) : (
                                            <Tag color="red">Rejected</Tag>
                                        )
                                    }
                                />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(_, record) => (
                                        <Space>
                                            <Button
                                                type="default"
                                                shape="circle"
                                                icon={<EyeOutlined />}
                                                onClick={() =>
                                                    showViewModal(record)
                                                }
                                            ></Button>
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<CheckCircleOutlined />}
                                                onClick={() =>
                                                    Modal.confirm({
                                                        title: "Approved?",
                                                        icon: (
                                                            <QuestionCircleOutlined />
                                                        ),
                                                        content:
                                                            "Are you sure you want to approved this job?",
                                                        okText: "Yes",
                                                        cancelText: "No",
                                                        onOk() {
                                                            handleApproved(
                                                                record
                                                            );
                                                        },
                                                    })
                                                }
                                            ></Button>
                                            <Button
                                                danger
                                                shape="circle"
                                                icon={<CloseCircleOutlined />}
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
                        </div>
                        {/* Modal */}
                        <Modal
                            title="JOB INFORMATION"
                            width={600}
                            open={isModalOpen}
                            onCancel={handleCancel}
                            maskClosable={false}
                            footer={null}
                        >
                            <Divider orientation="left">
                                Basic Job Details
                            </Divider>
                            <div className="mb-4">
                                <p className="font-semibold"> Job Title:</p>
                                <p className="ml-2">{job?.job_title}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold"> Industry:</p>
                                <p className="ml-2">{job?.industry}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold"> Job Type:</p>
                                <p className="ml-2">{job?.job_type}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold"> Description:</p>
                                <p className="ml-2">{job?.description}</p>
                            </div>

                            <Divider orientation="left">Salary</Divider>

                            <div className="mb-4">
                                <p className="font-semibold"> Currency:</p>
                                <p className="ml-2">{job?.currency}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold"> Minimum:</p>
                                <p className="ml-2">{job?.salary_min}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold"> Maximum:</p>
                                <p className="ml-2">{job?.salary_max}</p>
                            </div>

                            <Divider orientation="left">
                                Job Requirements
                            </Divider>
                            <div className="mb-4">
                                <p className="font-semibold"> Qualifications:</p>
                                <p className="ml-2">{job?.qualifications}</p>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold"> Languages:</p>
                                <div className="ml-2">
                                    {job?.languages
                                        ?.split("|")
                                        .map((language, index) => (
                                            <li
                                                className="list-disc"
                                                key={index}
                                            >
                                                {language}
                                            </li>
                                        ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold"> Skills:</p>
                                <div className="ml-2">
                                    {
                                        job?.skills?.split("|").map((skill, index) => (
                                            <li className="list-disc" key={index}>{skill}</li>
                                        ))
                                    }
                                    </div>
                            </div>
                            <Divider orientation="left">
                                Additional Details
                            </Divider>
                            <div className="mb-4">
                                <p className="font-semibold"> Benefits:</p>
                                <div className="ml-2">
                                    {
                                        job?.benefits?.split("|").map((benefit, index) => (
                                            <li className="list-disc" key={index}>{benefit}</li>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold"> Location:</p>
                                <p className="ml-2">{job?.location}</p>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold"> Schedule:</p>
                                <p className="ml-2">{job?.schedule}</p>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold"> Vacancies:</p>
                                <p className="ml-2">{job?.vacancies}</p>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
