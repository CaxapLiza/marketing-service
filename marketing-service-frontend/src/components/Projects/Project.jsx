import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, Get, GetList, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";

const Project = () => {
  const { id } = useParams()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState(0);
  const [contract, setContract] = useState(0);

  const [clients, setClients] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    id && Get(id, "projects", 8084)
      .then(res => {
        setTitle(res.title);
        setDescription(res.description);
        setClient(res.client_id);
        setContract(res.contract_id);
      })
      .catch(err => console.log(err));
    GetList("clients", 8081)
      .then(res => setClients(res))
      .catch(err => console.log(err));
    GetList("contracts", 8082)
      .then(res => setContracts(res))
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "Название", type: "text", state: title, setState: setTitle},
    {id: 1, label: "Описание", type: "text", state: description, setState: setDescription},
  ]

  const selects = [
    {id: 0, options: clients, title: "Клиент", selectedValue: client, setSelectedValue: setClient},
    {id: 1, options: contracts, title: "Договор", selectedValue: contract, setSelectedValue: setContract},
  ]

  const nav = useNavigate();

  const handleUpdate = () => {
    const newData = {
      title: title,
      description: description,
      client_id: parseInt(client),
      contract_id: parseInt(contract)
    };
    Update(id, newData, "projects", 8084)
      .then()
      .catch(err => console.log(err));
    nav("/projects");
  }

  const handleCreate = () => {
    const newData = {
      title: title,
      description: description,
      client_id: parseInt(client),
      contract_id: parseInt(contract)
    };
    Create(newData, "projects", 8084)
      .then()
      .catch(err => console.log(err));
    nav("/projects");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={id ? handleUpdate : handleCreate} selects={selects}/>
  );
};

Project.propTypes = {
  id: PropTypes.number
};

export default Project;