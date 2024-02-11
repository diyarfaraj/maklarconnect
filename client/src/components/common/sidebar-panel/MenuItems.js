import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuth } from '@/app/context/store';

const MenuItems = () => {
  const { logout } = useAuth(); // Use the login function from the context

  const menuItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "Add New Property",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "My Properties",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "My Favorites",
        },
        {
          href: "/dashboard-saved-search",
          icon: "flaticon-search-2",
          text: "Saved Search",
        },
        {
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "My Package",
        },
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          icon: "flaticon-logout",
          text: "Logout",
          action: () => {
            logout();
            window.location.href = "/";
          },
        },
      ],
    },
  ];


  return (
    <ul className="navbar-nav">
      {menuItems.flatMap((section) =>
        section.items.map((item, index) => (
          <li className="nav-item" key={index}>
            {item.action ? (
              // For actions like Logout, use a button or div instead of Link
              <Link href="/">
                <div onClick={item.action} className="nav-link" style={{ cursor: 'pointer' }}>
                  <i className={`${item.icon} mr-2`}></i> {item.text}
                </div>
              </Link>

            ) : (
              // Use Link for navigation items
              <Link href={item.href} passHref>
                <div className="nav-link">
                  <i className={`${item.icon} mr-2`}></i> {item.text}
                </div>
              </Link>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

export default MenuItems;
