import React, { useState } from "react";
import {
    AppstoreOutlined,
    MenuOutlined,
    SettingOutlined,
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { Link, usePage } from "@inertiajs/react"; 
import ApplicationLogo from "@/Components/ApplicationLogo";


export default function AuthenticatedLayout({ header, children }) {
    const currentRoute = route().current();
    
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };
    
    const items = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "dashboard",
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link href={route("admin.user")}>User</Link>,
            key: "admin.user",
            icon: <UserOutlined />,
        },
    ];

    const user = usePage().props.auth.user;

    const profile = [
        {
            label: user ? user.name : "User",
            key: "profile",
            icon: <UserOutlined />,
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
                            <Menu
                                className="max-h-16 leading-[64px]"
                                selectedKeys={[currentRoute]}
                                mode="horizontal"
                                items={items}
                            />
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
                <Menu
                    mode="inline"
                    selectedKeys={[currentRoute]}
                    items={items}
                />
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
