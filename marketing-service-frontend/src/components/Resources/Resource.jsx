import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Get, GetList, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";

const Resource = () => {
  const { id } = useParams()

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(id);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    id && Get(id, "resources", 8085)
      .then(res => {
        console.log(res);
        setLink(res.link);
        setDescription(res.description);
        setProject(res.project_id);
      })
      .catch(err => console.log(err));
    GetList("projects", 8084)
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "Ссылка", type: "text", state: link, setState: setLink},
    {id: 1, label: "Описание", type: "text", state: description, setState: setDescription},
  ]

  const selects = [
    {id: 0, title: "Проект", options: projects, selectedValue: project, setSelectedValue: setProject}
  ]

  const nav = useNavigate();

  const handleUpdate = () => {
    const newData = {
      link: link,
      description: description,
      project_id: parseInt(project)
    };
    Update(id, newData, "resources", 8085)
      .then()
      .catch(err => console.log(err));
    nav("/resources");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={handleUpdate} selects={selects}/>
  );
};

Resource.propTypes = {
  id: PropTypes.number
};

export default Resource;