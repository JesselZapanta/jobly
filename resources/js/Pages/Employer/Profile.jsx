import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";

import { MailOutlined, LockOutlined, LoginOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
import { useState } from "react";
import axios from "axios";


export default function Profile() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (values) => {
        setLoading(true);

        axios
            .post("/employer/make-profile/store", values)
            .then((res) => {
                if (res.data.status === "created") {
                    router.visit("/dashboard");
                }
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <GuestLayout>
            <Head title="Company Information" />

            <h2 className="mb-2 font-bold">COMPANY INFORMATION</h2>

            <Form
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={(errorInfo) => {
                    console.log("Form submission failed:", errorInfo);
                }}
                layout="vertical"
                autoComplete="off"
                initialValues={{
                    company_name: "",
                    contact: "",
                    website: "",
                    address: "",
                    industry: "",
                    description: "",
                }}
            >
                <Form.Item
                    label="COMPANY NAME"
                    name="company_name"
                    // Custom error handling
                    validateStatus={errors?.company_name ? "error" : ""}
                    help={errors?.company_name ? errors.company_name[0] : ""}
                >
                    <Input
                        placeholder="Company Name"
                        size="large"
                        prefix={<UserOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="CONTACT"
                    name="contact"
                    validateStatus={errors?.contact ? "error" : ""}
                    help={errors?.contact ? errors?.contact[0] : ""}
                >
                    <Input
                        placeholder="09xxxxxxxxx"
                        size="large"
                        type="number"
                        prefix={<PhoneOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="WEBSITE"
                    name="website"
                    validateStatus={errors?.website ? "error" : ""}
                    help={errors?.website ? errors?.website[0] : ""}
                >
                    <Input
                        placeholder="example.com"
                        addonBefore="https://"
                        type="website"
                        size="large"
                        // prefix={<LockOutlined />}
                    />
                </Form.Item>
                
                <Form.Item
                    label="ADDRESS"
                    name="address"
                    validateStatus={errors?.address ? "error" : ""}
                    help={errors?.address ? errors?.address[0] : ""}
                >
                    <Input
                        size="large"
                        prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    validateStatus={errors?.description ? "error" : ""}
                    help={errors?.description ? errors?.description[0] : ""}
                >
                    <TextArea
                        placeholder="Company Description"
                        allowClear
                        size="large"
                        rows={4}
                    />
                </Form.Item>

                <Form.Item
                    label="INDUSTRY"
                    name="industry"
                    validateStatus={errors?.industry ? "error" : ""}
                    help={errors?.industry ? errors?.industry[0] : ""}
                    className="w-full"
                >
                    <Select
                        size="large"
                        options={[
                            { value: "it", label: "IT" },
                            { value: "finance", label: "FINANCE" },
                            { value: "healthcare", label: "HEALTHCARE" },
                            { value: "education", label: "EDUCATION" },
                            { value: "manufacturing", label: "MANUFACTURING" },
                            { value: "retail", label: "RETAIL" },
                            { value: "construction", label: "CONSTRUCTION" },
                            { value: "hospitality", label: "HOSPITALITY" },
                            {
                                value: "transportation",
                                label: "TRANSPORTATION",
                            },
                            { value: "energy", label: "ENERGY" },
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        icon={<LoginOutlined />}
                        size="large"
                        block
                        disabled={loading}
                        loading={loading}
                    >
                        Saved
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}

