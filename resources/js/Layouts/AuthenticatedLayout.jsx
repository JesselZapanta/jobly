import React, { useState } from "react";
import {
    AppstoreOutlined,
    MenuOutlined,
    SettingOutlined,
    UserOutlined,
    LockOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Menu } from "antd";
import { Link, usePage } from "@inertiajs/react"; 
import ApplicationLogo from "@/Components/ApplicationLogo";


export default function AuthenticatedLayout({ auth,header, children }) {
    const currentRoute = route().current();

    // console.log(currentRoute);

    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const admin = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "admin.dashboard",
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link href={route("admin.user")}>User</Link>,
            key: "admin.user",
            icon: <UserOutlined />,
        },
        {
            label: <Link href={route("admin.job.index")}>Pending Jobs</Link>,
            key: "admin.job.index",
            icon: <SolutionOutlined />,
        },
    ];

    const employer = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "employer.dashboard",
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link href={route("employer.job.index")}>Jobs</Link>,
            key: "employer.job.index",
            icon: <UserOutlined />,
        },
    ];

    const user = usePage().props.auth.user;

    const profile = [
        {
            label: (
                <Avatar
                    size="large"
                    src={`/storage/avatars/${user.avatar}`}
                    icon={<UserOutlined />}
                />
            ),

            key: "profile",
            children: [
                {
                    // label: "User",
                    type: "group",
                    children: [
                        {
                            label: (
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            ),
                            key: "profile.edit",
                            icon: <UserOutlined />,
                        },
                        {
                            label: (
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            ),
                            key: "logout",
                            icon: <LockOutlined />,
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className=" bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <ApplicationLogo />
                        </div>
                        {/* Desktop Menu */}
                        <div className="ml-2 flex-grow hidden md:block">
                            {auth.user.role === 0 && (
                                <Menu
                                    className="max-h-16 leading-[64px]"
                                    selectedKeys={[currentRoute]}
                                    mode="horizontal"
                                    items={admin}
                                />
                            )}
                            {auth.user.role === 1 && (
                                <Menu
                                    className="max-h-16 leading-[64px]"
                                    selectedKeys={[currentRoute]}
                                    mode="horizontal"
                                    items={employer}
                                />
                            )}
                        </div>
                        {/* Profile Menu */}
                        <div className="flex-grow hidden md:block">
                            <Menu
                                className="max-h-16 justify-end leading-[64px]"
                                mode="horizontal"
                                items={profile}
                            />
                        </div>
                        {/* Mobile Drawer Toggle */}
                        <div className="md:hidden">
                            <Button
                                icon={<MenuOutlined />}
                                onClick={toggleDrawer}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </nav>
            {/* Drawer for Mobile Menu */}
            <Drawer
                title="Navigation"
                placement="right"
                onClose={toggleDrawer}
                open={drawerVisible}
            >
                {auth.user.role === 0 && (
                    <Menu
                        mode="inline"
                        selectedKeys={[currentRoute]}
                        items={admin}
                    />
                )}
                {auth.user.role === 1 && (
                    <Menu
                        mode="inline"
                        selectedKeys={[currentRoute]}
                        items={employer}
                    />
                )}
                <Menu mode="inline" className="mt-4" items={profile} />
            </Drawer>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )} */}

            <main>{children}</main>
        </div>
    );
}
