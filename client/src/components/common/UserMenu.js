// UserMenu.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useAuth } from '@/app/context/store';

const UserMenu = () => {
    const { logout } = useAuth(); // Use the login function from the context
    const pathname = usePathname();

    const menuItems = [
        {
            title: "MAIN",
            items: [
                {
                    icon: "flaticon-discovery",
                    text: "Dashboard",
                    href: "/dashboard-home",
                },
                {
                    icon: "flaticon-chat-1",
                    text: "Message",
                    href: "/dashboard-message",
                },
            ],
        },
        {
            title: "MANAGE LISTINGS",
            items: [
                {
                    icon: "flaticon-new-tab",
                    text: "Add New Property",
                    href: "/dashboard-add-property",
                },
                {
                    icon: "flaticon-home",
                    text: "My Properties",
                    href: "/dashboard-my-properties",
                },
                {
                    icon: "flaticon-like",
                    text: "My Favorites",
                    href: "/dashboard-my-favourites",
                },
                {
                    icon: "flaticon-search-2",
                    text: "Saved Search",
                    href: "/dashboard-saved-search",
                },
                { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
            ],
        },
        {
            title: "MANAGE ACCOUNT",
            items: [
                {
                    icon: "flaticon-protection",
                    text: "My Package",
                    href: "/dashboard-my-package",
                },
                {
                    icon: "flaticon-user",
                    text: "My Profile",
                    href: "/dashboard-my-profile",
                },
                {
                    icon: "flaticon-logout", text: "Logout", action: () => {
                        logout();
                        window.location.href = "/";
                    },
                },
            ],
        },
    ];

    return (
        <div className="col-6 col-lg-auto">
            <div className="text-center text-lg-end header_right_widgets">
                <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    <li className="d-none d-sm-block">
                        <Link className="text-center mr20 notif" href="/dashboard-message">
                            <span className="flaticon-email" />
                        </Link>
                    </li>
                    {/* End email icon */}

                    <li className="d-none d-sm-block">
                        <a className="text-center mr20 notif" href="/dashboard-home">
                            <span className="flaticon-bell" />
                        </a>
                    </li>
                    {/* End notification icon */}

                    {/* Additional items like notifications can be handled here */}
                    <li className="user_setting d-none d-sm-block">
                        <div className="dropdown">
                            <a className="text-center mr20 notif" style={{
                                backgroundColor: "rgba(247, 247, 247, 0.3921568627)",
                                borderRadius: '50%',
                                height: '44px',
                                lineHeight: '44px',
                                textAlign: 'center',
                                width: '44px',
                            }} href="#" data-bs-toggle="dropdown">
                                {/* <Image
                                    width={44}
                                    height={44}
                                    src="/images/resource/user.png"
                                    alt="user.png"
                                /> */}
                                <span className="flaticon-settings" />
                            </a>
                            <div className="dropdown-menu">
                                <div className="user_setting_content">
                                    {menuItems.map((section, sectionIndex) => (
                                        <div key={sectionIndex}>

                                            <p className={`fz15 fw400 ff-heading ${sectionIndex === 0 ? "mb20" : "mt30"}`}>
                                                {section.title}
                                            </p>
                                            {section.items.map((item, itemIndex) => (
                                                item.action ? (
                                                    // For actions like Logout, use a button or div instead of Link
                                                    <Link key={itemIndex} href="/">
                                                        <div onClick={item.action} className={`dropdown-item ${pathname === item.href ? "-is-active" : ""}`}
                                                        >
                                                            <i className={`${item.icon} mr-2`}></i> {item.text}
                                                        </div>
                                                    </Link>

                                                ) : (
                                                    <Link
                                                        key={itemIndex}
                                                        className={`dropdown-item ${pathname === item.href ? "-is-active" : ""}`}
                                                        href={item.href}
                                                    >
                                                        <i className={`${item.icon} mr10`} />
                                                        {item.text}
                                                    </Link>
                                                )))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default UserMenu;
