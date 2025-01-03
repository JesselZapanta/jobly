    import Checkbox from '@/Components/Checkbox';
    import InputError from '@/Components/InputError';
    import InputLabel from '@/Components/InputLabel';
    import PrimaryButton from '@/Components/PrimaryButton';
    import TextInput from '@/Components/TextInput';
    import GuestLayout from '@/Layouts/GuestLayout';
    import { Head, Link, useForm } from '@inertiajs/react';

    import { MailOutlined, LockOutlined, LoginOutlined  } from "@ant-design/icons";
    import { Button, Flex, Form, Input } from "antd";
    import { useState } from 'react';

    export default function Login({ status, canResetPassword }) {

        // const { data, setData, post, processing, errors, reset } = useForm({
        //     email: '',
        //     password: '',
        //     remember: false,
        // });

        // const submit = (e) => {
        //     e.preventDefault();

        //     post(route('login'), {
        //         onFinish: () => reset('password'),
        //     });
        // };

        const [ form ] = Form.useForm();
        const [ loading, setLoading ] = useState(false);
        const [ errors, setErrors ] = useState({});

        const handleSubmit = (values) => {

            console.log(values);
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 2000);
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
                    <Form.Item label="Email" naem="email">
                        <Input
                            placeholder="Email"
                            size="large"
                            prefix={<MailOutlined />}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input
                            placeholder="Password"
                            type="password"
                            size="large"
                            prefix={<LockOutlined />}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            icon={<LoginOutlined />}
                            size="large"
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                {/* <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form> */}
            </GuestLayout>
        );
    }
