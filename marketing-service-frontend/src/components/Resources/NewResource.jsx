import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, GetList} from "../../api/api.js";
import {useNavigate, useParams} from "react-router";
import PropTypes from "prop-types";

const NewResource = () => {
  const { id } = useParams()

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(id);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetList("projects", 8084)
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [])

  const inputs = [
    {id: 0, label: "Ссылка", type: "text", state: link, setState: setLink},
    {id: 1, label: "Описание", type: "text", state: description, setState: setDescription},
  ]

  const selects = [
    {id: 0, title: "Проект", options: projects, selectedValue: project, setSelectedValue: setProject}
  ]

  const nav = useNavigate();

  const handleCreate = () => {
    const newData = {
      link: link,
      description: description,
      project_id: parseInt(project)
    };
    Create(newData, "resources", 8085)
      .then()
      .catch(err => console.log(err));
    nav("/resources");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={handleCreate} selects={selects}/>
  );
};

NewResource.propTypes = {
  id: PropTypes.number
};

export default NewResource;