import React, { useState } from "react";
import "./dropdown.styles.css";

const Dropdown = ({ values, selected, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="dropdown-container">
      <input
        onFocus={() => setIsVisible(true)}
        value={selected.currency}
        onChange={() => {}}
      />
      {isVisible && (
        <ul>
          {values
            .map((value) => (
              <li
                key={value.currency}
                onClick={() => {
                  onChange(value);
                  setIsVisible(false);
                }}
              >
                <div>{value.currency}</div>
                {selected === value.current && (
                  <div className="dropdown-item-selected"></div>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
