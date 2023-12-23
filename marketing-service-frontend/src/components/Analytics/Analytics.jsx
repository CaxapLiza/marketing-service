import {useEffect, useState} from "react";
import {Delete, GetList, GetListById} from "../../api/api.js";
import {useNavigate} from "react-router";
import '../Items.css'
import Select from "../../ui/form/Select.jsx";
import Chart from "./Chart.jsx";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);

  const [project, setProject] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetList("projects", 8084)
      .then(res => {
        setProjects(res);
        res.length > 0 && setProject(res[0].id)
      })
      .catch(err => console.log(err));

  }, [])

  useEffect(() => {
    project && GetListById(project, "analytics", 8080)
      .then(res => {
        res ? setAnalytics(res) : setAnalytics([])
      })
      .catch(err => console.log(err));
  }, [project])

  const nav = useNavigate();

  const handleCreate = () => {
    nav(`/analytics/new/${project}`);
  }

  const handleUpdate = (id) => {
    nav(`/analytics/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "analytics", 8080)
      .then(() => setAnalytics(analytics.filter(analytic => analytic.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <Select selectedValue={project} setSelectedValue={setProject} options={projects} title={"Проект"}/>
      <button onClick={handleCreate}>Добавить</button>
      {analytics.map(analytic => (
        <div key={analytic.id} className="item">
          <div>Проект №{analytic.project_id}</div>
          <button onClick={() => handleUpdate(analytic.id)}>Открыть</button>
          <button onClick={() => handleDelete(analytic.id)}>Удалить</button>
        </div>
      ))}
      {analytics && <Chart analytics={analytics} />}
    </div>
  );
};

export default Analytics;