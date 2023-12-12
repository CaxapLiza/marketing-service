import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, Get, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";

const Service = () => {
  const { id } = useParams()

  const [description, setDescription] = useState("");

  useEffect(() => {
    id && Get(id, "services", 8086)
      .then(res => {
        setDescription(res.description);
      })
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "Имя", type: "text", state: description, setState: setDescription}
  ]

  const nav = useNavigate();

  const handleUpdate = () => {
    const newData = {
      description: description
    };
    Update(id, newData, "services", 8086)
      .then()
      .catch(err => console.log(err));
    nav("/services");
  }

  const handleCreate = () => {
    const newData = {
      description: description
    };
    Create(newData, "services", 8086)
      .then()
      .catch(err => console.log(err));
    nav("/services");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={id ? handleUpdate : handleCreate} selects={[]}/>
  );
};

Service.propTypes = {
  id: PropTypes.number
};

export default Service;