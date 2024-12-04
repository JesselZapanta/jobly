import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Divider, Form, Input, Modal, Row, Select, Space, Switch } from "antd";

import {
    MailOutlined,
    LockOutlined,
    UserOutlined,
    PlusOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    EditOutlined,
    UploadOutlined,
    SolutionOutlined,
    DollarOutlined,
    BookOutlined,
    StarOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";

export default function Index({ auth }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        // console.log(values);
        setProcessing(true);
        
        try{
            const res = await axios.post(`/employer/job/store`, values);

            if(res.data.status === 'created'){
                
            }
        }catch(err){
            // console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        }finally{
            setProcessing(false);
        }
    }

    const showCreateModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }



    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Jobs
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

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
                                    placeholder="Input job title"
                                    allowClear
                                    enterButton="Search"
                                    // loading={searching}
                                    // onChange={(e) => setSearch(e.target.value)}
                                    // onSearch={() => getData(true)}
                                />

                                <Button
                                    type="primary"
                                    size="medium"
                                    onClick={showCreateModal}
                                    icon={<PlusOutlined />}
                                >
                                    New
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <Modal
                        title="JOB INFORMATION"
                        width={1000}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        maskClosable={false}
                        footer={null}
                    >
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout="vertical"
                            autoComplete="off"
                        >
                            <Divider orientation="left">
                                Basic Job Details
                            </Divider>
                            <div className="flex gap-4">
                                <Form.Item
                                    label="JOB TITLE"
                                    name="job_title"
                                    className="w-full"
                                    // Custom error handling
                                    validateStatus={
                                        errors?.job_title ? "error" : ""
                                    }
                                    help={
                                        errors?.job_title
                                            ? errors.job_title[0]
                                            : ""
                                    }
                                >
                                    <Input
                                        placeholder="Job Title"
                                        prefix={<SolutionOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="INDUSTRY"
                                    name="industry"
                                    validateStatus={
                                        errors?.industry ? "error" : ""
                                    }
                                    help={
                                        errors?.industry
                                            ? errors?.industry[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            { value: "it", label: "IT" },
                                            {
                                                value: "finance",
                                                label: "Finance",
                                            },
                                            {
                                                value: "healthcare",
                                                label: "Healthcare",
                                            },
                                            {
                                                value: "education",
                                                label: "Education",
                                            },
                                            {
                                                value: "manufacturing",
                                                label: "Manufacturing",
                                            },
                                            {
                                                value: "retail",
                                                label: "Retail",
                                            },
                                            {
                                                value: "construction",
                                                label: "Construction",
                                            },
                                            {
                                                value: "hospitality",
                                                label: "Hospitality",
                                            },
                                            {
                                                value: "transportation",
                                                label: "Transportation",
                                            },
                                            {
                                                value: "energy",
                                                label: "Energy",
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="JOB TYPE"
                                    name="job_type"
                                    validateStatus={
                                        errors?.job_type ? "error" : ""
                                    }
                                    help={
                                        errors?.job_type
                                            ? errors?.job_type[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            {
                                                value: "full-time",
                                                label: "Full-time",
                                            },
                                            {
                                                value: "part-time",
                                                label: "Part-time",
                                            },
                                            {
                                                value: "contract",
                                                label: "Contract",
                                            },
                                            {
                                                value: "internship",
                                                label: "Internship",
                                            },
                                            {
                                                value: "freelance",
                                                label: "Freelance",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="DESCRIPTION"
                                name="description"
                                validateStatus={
                                    errors?.description ? "error" : ""
                                }
                                help={
                                    errors?.description
                                        ? errors?.description[0]
                                        : ""
                                }
                            >
                                <TextArea
                                    placeholder="Job Description"
                                    allowClear
                                    rows={4}
                                />
                            </Form.Item>

                            <Divider orientation="left">Salary</Divider>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="CURRENCY"
                                    name="currency"
                                    validateStatus={
                                        errors?.currency ? "error" : ""
                                    }
                                    help={
                                        errors?.currency
                                            ? errors?.currency[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            {
                                                value: "USD",
                                                label: "United States Dollar (USD)",
                                            },
                                            {
                                                value: "EUR",
                                                label: "Euro (EUR)",
                                            },
                                            {
                                                value: "JPY",
                                                label: "Japanese Yen (JPY)",
                                            },
                                            {
                                                value: "GBP",
                                                label: "British Pound Sterling (GBP)",
                                            },
                                            {
                                                value: "AUD",
                                                label: "Australian Dollar (AUD)",
                                            },
                                            {
                                                value: "CAD",
                                                label: "Canadian Dollar (CAD)",
                                            },
                                            {
                                                value: "CHF",
                                                label: "Swiss Franc (CHF)",
                                            },
                                            {
                                                value: "CNY",
                                                label: "Chinese Yuan (CNY)",
                                            },
                                            {
                                                value: "HKD",
                                                label: "Hong Kong Dollar (HKD)",
                                            },
                                            {
                                                value: "NZD",
                                                label: "New Zealand Dollar (NZD)",
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="SALARY MIN"
                                    name="salary_min"
                                    className="w-full"
                                    // Custom error handling
                                    validateStatus={
                                        errors?.salary_min ? "error" : ""
                                    }
                                    help={
                                        errors?.salary_min
                                            ? errors.salary_min[0]
                                            : ""
                                    }
                                >
                                    <Input
                                        placeholder="Minimum Salary"
                                        type="number"
                                        prefix={<DollarOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="SALARY MAX"
                                    name="salary_max"
                                    className="w-full"
                                    // Custom error handling
                                    validateStatus={
                                        errors?.salary_max ? "error" : ""
                                    }
                                    help={
                                        errors?.salary_max
                                            ? errors.salary_max[0]
                                            : ""
                                    }
                                >
                                    <Input
                                        placeholder="Maximum Salary"
                                        type="number"
                                        prefix={<DollarOutlined />}
                                    />
                                </Form.Item>
                            </div>

                            <Divider orientation="left">
                                Job Requirements
                            </Divider>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="QUALIFICATIONS / EDUCATION"
                                    name="qualifications"
                                    validateStatus={
                                        errors?.qualifications ? "error" : ""
                                    }
                                    help={
                                        errors?.qualifications
                                            ? errors?.qualifications[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Input
                                        placeholder="e.g., Bachelor's Degree in Computer Science"
                                        prefix={<BookOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="EXPERIENCE"
                                    name="experience"
                                    validateStatus={
                                        errors?.experience ? "error" : ""
                                    }
                                    help={
                                        errors?.experience
                                            ? errors?.experience[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Input
                                        placeholder="e.g., 3+ years"
                                        prefix={<ClockCircleOutlined />}
                                    />
                                </Form.Item>
                            </div>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="LANGUAGE REQUIREMENTS"
                                    name="languages"
                                    validateStatus={
                                        errors?.languages ? "error" : ""
                                    }
                                    help={
                                        errors?.languages
                                            ? errors?.languages[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        mode="tags"
                                        placeholder="e.g., English, Spanish"
                                        tokenSeparators={[","]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="SKILLS"
                                    name="skills"
                                    validateStatus={
                                        errors?.skills ? "error" : ""
                                    }
                                    help={
                                        errors?.skills ? errors?.skills[0] : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        mode="tags"
                                        placeholder="e.g., JavaScript, React, REST APIs"
                                        tokenSeparators={[","]}
                                    />
                                </Form.Item>
                            </div>

                            <Divider orientation="left">
                                Additional Details
                            </Divider>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="BENEFITS"
                                    name="benefits"
                                    validateStatus={
                                        errors?.benefits ? "error" : ""
                                    }
                                    help={
                                        errors?.benefits
                                            ? errors?.benefits[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        mode="tags"
                                        placeholder="e.g., Health Insurance, Remote Work, Paid Time Off"
                                        tokenSeparators={[","]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="LOCATION"
                                    name="location"
                                    validateStatus={
                                        errors?.location ? "error" : ""
                                    }
                                    help={
                                        errors?.location
                                            ? errors?.location[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Input
                                        placeholder="e.g., San Francisco, CA or Remote"
                                        prefix={<EnvironmentOutlined />}
                                    />
                                </Form.Item>
                            </div>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="SCHEDULE"
                                    name="schedule"
                                    validateStatus={
                                        errors?.schedule ? "error" : ""
                                    }
                                    help={
                                        errors?.schedule
                                            ? errors?.schedule[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Input
                                        placeholder="e.g., Monday to Friday, 9 AM to 5 PM"
                                        prefix={<CalendarOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="VACANCIES"
                                    name="vacancies"
                                    validateStatus={
                                        errors?.vacancies ? "error" : ""
                                    }
                                    help={
                                        errors?.vacancies
                                            ? errors?.vacancies[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Input
                                        type="number"
                                        placeholder="e.g., 2"
                                        prefix={<TeamOutlined />}
                                        min={1}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="STATUS"
                                    name="status"
                                    validateStatus={
                                        errors?.status ? "error" : ""
                                    }
                                    help={
                                        errors?.status ? errors?.status[0] : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            { value: 0, label: "Active" },
                                            { value: 1, label: "Inactive" },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <Row justify="end">
                                <Space size="small">
                                    <Button
                                        type="default"
                                        // onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        htmlType="submFull-time"
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        disabled={processing}
                                        loading={processing}
                                    >
                                        Create
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