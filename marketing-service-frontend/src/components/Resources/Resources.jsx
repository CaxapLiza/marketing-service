import {useEffect, useState} from "react";
import {Delete, GetList, GetListById} from "../../api/api.js";
import {useNavigate} from "react-router";
import '../Items.css'
import Select from "../../ui/form/Select.jsx";

const Resources = () => {
  const [resources, setResources] = useState([]);

  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetList("projects", 8084)
      .then(res => {
        setProject(res[0].id);
        setProjects(res);
      })
      .catch(err => console.log(err));
    projects.length > 0 && setProject(projects[0].id)
  }, [])

  useEffect(() => {
    project && GetListById(project, "resources", 8085)
      .then(res => setResources(res))
      .catch(err => console.log(err));
  }, [project])

  const nav = useNavigate();

  const handleCreate = () => {
    nav(`/resources/new/${project}`);
  }

  const handleUpdate = (id) => {
    nav(`/resources/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "resources", 8085)
      .then(() => setResources(resources.filter(resource => resource.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <Select selectedValue={project} setSelectedValue={setProject} options={projects} title={"Проект"}/>
      <button onClick={handleCreate}>Добавить</button>
      {resources.map(resource => (
        <div key={resource.id} className="item">
          <div>Проект №{resource.project_id}</div>
          <button onClick={() => handleUpdate(resource.id)}>Редактировать</button>
          <button onClick={() => handleDelete(resource.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Resources;