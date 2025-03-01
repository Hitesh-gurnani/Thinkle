import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./dropdown.module.css";

export default function Dropdown({
  label,
  options,
  onChange,
  defaultValue = "",
  placeholder = "",
  className = "",
  style = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value, label) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && !isOpen) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ||
    placeholder;

  return (
    <div
      className={`${styles.dropdownContainer}`}
      style={style}
      ref={dropdownRef}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.dropdownTrigger} ${className}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
      >
        <span
          className={selectedOption ? styles.selectedText : styles.placeholder}
        >
          {selectedLabel}
        </span>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          size={18}
        />
      </div>

      {isOpen && (
        <ul
          id="dropdown-options"
          className={styles.dropdownOptions}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                selectedOption === option.value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value, option.label)}
              role="option"
              aria-selected={selectedOption === option.value}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
