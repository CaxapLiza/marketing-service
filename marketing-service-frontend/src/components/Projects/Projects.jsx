import {useEffect, useState} from "react";
import {Delete, GetList} from "../../api/api.js";
import '../Items.css';
import {useNavigate} from "react-router";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetList("projects", 8084)
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [])

  const nav = useNavigate();

  const handleCreate = () => {
    nav("/projects/new");
  }

  const handleUpdate = (id) => {
    nav(`/projects/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "projects", 8084)
      .then(() => setProjects(projects.filter(project => project.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <button onClick={handleCreate}>Добавить</button>
      {projects.map(project => (
        <div key={project.id} className="item">
          <div>{project.title}</div>
          <button onClick={() => handleUpdate(project.id)}>Редактировать</button>
          <button onClick={() => handleDelete(project.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;