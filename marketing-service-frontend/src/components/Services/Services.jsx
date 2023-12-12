import {useEffect, useState} from "react";
import {Delete, GetList} from "../../api/api.js";
import {useNavigate} from "react-router";
import '../Items.css'

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    GetList("services", 8086)
      .then(res => setServices(res))
      .catch(err => console.log(err));
  }, [])

  const nav = useNavigate();

  const handleCreate = () => {
    nav("/services/new");
  }

  const handleUpdate = (id) => {
    nav(`/services/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "services", 8086)
      .then(() => setServices(services.filter(service => service.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <button onClick={handleCreate}>Добавить</button>
      {services.map(service => (
        <div key={service.id} className="item">
          <div>{service.description}</div>
          <button onClick={() => handleUpdate(service.id)}>Редактировать</button>
          <button onClick={() => handleDelete(service.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Services;