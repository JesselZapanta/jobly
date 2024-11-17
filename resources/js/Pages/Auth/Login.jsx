    import GuestLayout from '@/Layouts/GuestLayout';
    import { Head, Link, router, useForm } from '@inertiajs/react';

    import { MailOutlined, LockOutlined, LoginOutlined  } from "@ant-design/icons";
    import { Button, Form, Input } from "antd";
    import { useState } from 'react';
    import axios from 'axios';

    export default function Login({ status, canResetPassword }) {

        const [ form ] = Form.useForm();
        const [ loading, setLoading ] = useState(false);
        const [ errors, setErrors ] = useState({});

        const handleSubmit = (values) => {

            setLoading(true);

            axios.post('/login', values)
                .then(res=>{
                    router.visit('/login')//change to dashboard controller
                }).catch(err => {
                    setErrors(err.response.data.errors);
                }).finally(() => {
                    setLoading(false);
                })
        };

        return (
            <GuestLayout>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    <Form.Item
                        label="EMAIL"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
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
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        validateStatus={errors?.password ? "error" : ""}
                        help={errors?.password ? errors?.password[0] : ""}
                    >
                        <Input
                            placeholder="Password"
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </GuestLayout>
        );
    }
