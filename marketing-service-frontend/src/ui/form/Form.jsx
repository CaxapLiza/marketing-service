import Input from "./Input.jsx";
import PropTypes from 'prop-types';
import Button from "../Button.jsx";
import "./Form.css"
import Select from "./Select.jsx";

const Form = ({buttonText, inputs, func, selects}) => {
  return (
    <form>
      {inputs.map(input => (
        <Input key={input.id} setState={input.setState} label={input.label} type={input.type} state={input.state} />
      ))}
      {selects.map(select => (
        <Select key={select.id} options={select.options} title={select.title}
                selectedValue={select.selectedValue} setSelectedValue={select.setSelectedValue} />
      ))}
      <Button text={buttonText} func={func}/>
    </form>
  );
};

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      type: PropTypes.string,
      state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      setState: PropTypes.func
    })
  ),
  buttonText: PropTypes.string,
  func: PropTypes.func,
  selects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      options: PropTypes.any,
      title: PropTypes.string,
      selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      setSelectedValue: PropTypes.func
    })
  )
};

export default Form;