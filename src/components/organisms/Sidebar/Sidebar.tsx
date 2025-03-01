import React, { useState } from "react";
import styles from "./sidebarstyles.module.css";
import { GrDown } from "react-icons/gr";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWallet, FaUserCircle, FaUser } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { RiFolderSharedLine } from "react-icons/ri";
import { IoHelpCircleSharp, IoColorWandSharp } from "react-icons/io5";
import { MdOutlineEditRoad } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

const NAV_ITEMS = [
  {
    name: "Coaches",
    icon: <FaUser size={20} />,
    route: "/coaches",
  },
  {
    name: "Thinkle Creator",
    icon: <IoColorWandSharp size={20} />,
    children: [
      {
        name: "Dashboard",
        icon: <BsHouseDoorFill size={20} />,
        route: "/dashboard",
      },
      {
        name: "Submission",
        icon: <MdOutlineEditRoad size={20} />,
        route: "/submissions",
      },
      { name: "Earnings", icon: <FaWallet size={20} />, route: "/earnings" },
      {
        name: "Trending",
        icon: <IoMdTrendingUp size={20} />,
        route: "/trending",
      },
      {
        name: "Refer",
        icon: <RiFolderSharedLine size={20} />,
        route: "/refer",
      },
      { name: "Help", icon: <IoHelpCircleSharp size={20} />, route: "/help" },
      { name: "Profile", icon: <FaUserCircle size={20} />, route: "/profile" },
    ],
  },
];

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const renderNavItems = (items) => {
    return items.map((item, index) => (
      <li key={index} className={styles.navItem}>
        <div
          className={`${styles.navItemHeader} ${
            activeItem === item.name ? styles.active : ""
          }`}
          onClick={() => {
            if (item.children) {
              toggleSection(item.name);
            } else if (item.route) {
              setActiveItem(item.name);
              navigate(item.route);
            }
          }}
        >
          <div className={styles.leftContent}>
            {item.icon && (
              <span className={styles.iconWrapper}>{item.icon}</span>
            )}
            <span>{item.name}</span>
          </div>

          {item.children && (
            <span
              className={`${styles.arrow} ${
                openSections[item.name] ? styles.open : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSection(item.name);
              }}
            >
              <GrDown size={16} />
            </span>
          )}
        </div>

        {item.children && openSections[item.name] && (
          <ul className={styles.nestedNav}>{renderNavItems(item.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {[...Array(3)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.logoContainer}>
          <img
            src="https://s3-alpha-sig.figma.com/img/b0ff/c05c/77cc8882ccfd6c1667cf10fb97cd9c61?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NkJC7ir8119npesZZQIchcze~DibI6dyhN5nK3b5PwlZUDqhicEN3gsXlL3oA5uogBXs6Ljtyobk72aNNyaeYXHNr66Q25MaqHI5vg~EKoFFNTMM0wZeZPURy8dPDGbsnCO~-3OZdXIrXlZVm-Eyt9o1PE9cOAteTrtH-kFAHpAGMmbm6NnYZV3QgmkGWeUHYWwg4BljuXjgnka-KwRTZgjENQbtflDkYnjQuG6iPCJ8mE~~TyrP6HYRR7PO-SyQkIzXbuDncbnGAhFhVl7aNdDoKDv-ZfEwrAuQY2-zObu5W2qW2AcrGLZ2rC2y-1KbtVlJGbXDVs0iHTIwhHj3pw__"
            alt="Thinkle+ Logo"
            className={styles.logo}
          />
          <TbLayoutSidebarLeftCollapseFilled
            color="rgba(133, 136, 147, 1)"
            size={24}
          />
        </div>
        <div className={styles.closeButton} onClick={toggleMenu}>
          ×
        </div>
        <nav className={styles.navigation}>
          <ul>{renderNavItems(NAV_ITEMS)}</ul>
        </nav>
      </div>
      {isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default Sidebar;
