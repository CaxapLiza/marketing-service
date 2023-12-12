import PropTypes from "prop-types";
import './Select.css';

const Select = ({selectedValue, setSelectedValue, options, title}) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  return (
    <label>
      {title}
      <select
        value={selectedValue}
        onChange={handleSelectChange}>
        {options.length > 0 && options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name && option.name || option.title && option.title || option.text && option.text}
          </option>
        ))}
      </select>
    </label>
  );
};

Select.propTypes = {
  title: PropTypes.string,
  options: PropTypes.any,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSelectedValue: PropTypes.func
};

export default Select;