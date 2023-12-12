import PropTypes from 'prop-types';
import "./Input.css"

const Input = ({label, type, state, setState}) => {
  const handleInputChange = (event) => {
    setState(event.target.value);
  };

  return (
    <label>
      {label}
      <input type={type} placeholder={label} value={state} onChange={handleInputChange}/>
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setState: PropTypes.func.isRequired
};

export default Input;