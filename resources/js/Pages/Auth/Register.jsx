import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";

import { MailOutlined, LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (values) => {
        setLoading(true);

        axios
            .post("/register", values)
            .then((res) => {
                router.visit("/login"); //change to dashboard controller
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
            <Head title="Log in" />

            <div className="w-full rounded-lg overflow-hidden mb-4">
                <Link href="/">
                    <img
                        src="/storage/images/banner.png"
                        alt="Jobly"
                        className="w-full j-full"
                    />
                </Link>
            </div>

            <Form
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={(errorInfo) => {
                    console.log("Form submission failed:", errorInfo);
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
                    help={errors?.password ? errors?.password[0] : ""}
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <div className="w-full flex justify-between">
                <Button type="link" href={route("login")}>
                    Already registered?
                </Button>
            </div>
        </GuestLayout>
    );
}

