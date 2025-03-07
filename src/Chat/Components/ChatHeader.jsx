import React, { useState, useRef, useEffect } from "react";
import styles from "../CSS/chatmain.module.css";
import Button from "../../components/atoms/Button/Button";
import { HiDotsHorizontal } from "react-icons/hi";
import { FlagIcon, TrashIcon } from "lucide-react";

function ChatHeader({ title, onBack, showBackButton, profileImage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeaderProfile}>
        {showBackButton && (
          <button className={styles.backButton} onClick={onBack}>
            ←
          </button>
        )}
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
        <h3
          className={styles.profileName}
          style={{
            marginLeft: "12px",
          }}
        >
          {title}
        </h3>
      </div>

      <div className={styles.headerActions}>
        <Button className={styles.bookSessionButton}>Book Session</Button>

        <div className={styles.menuContainer} ref={menuRef}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <HiDotsHorizontal size={20} />
          </button>
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>
                <FlagIcon size={20} />
                Report / Block
              </button>
              <button className={styles.dropdownItem}>
                <TrashIcon size={20} />
                Delete Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
