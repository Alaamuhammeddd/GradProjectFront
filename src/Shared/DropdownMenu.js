import "../Styles/Dropdown.css";

const DropdownMenu = ({ isOpen }) => {
  return (
    <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
    </ul>
  );
};

export default DropdownMenu;
