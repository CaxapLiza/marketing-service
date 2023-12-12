import PropTypes from "prop-types";
import "./Button.css"

const Button = ({text, func}) => {
  return (
    <button
      type="button" onClick={func}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired
};

export default Button;