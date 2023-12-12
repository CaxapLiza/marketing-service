import {useEffect, useState} from "react";
import {Delete, GetList} from "../../api/api.js";
import {useNavigate} from "react-router";
import '../Items.css'

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    GetList("clients", 8081)
      .then(res => setClients(res))
      .catch(err => console.log(err));
  }, [])

  const nav = useNavigate();

  const handleCreate = () => {
    nav("/clients/new");
  }

  const handleUpdate = (id) => {
    nav(`/clients/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "clients", 8081)
      .then(() => setClients(clients.filter(client => client.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <button onClick={handleCreate}>Добавить</button>
      {clients.map(client => (
        <div key={client.id} className="item">
          <div>{client.name}</div>
          <button onClick={() => handleUpdate(client.id)}>Редактировать</button>
          <button onClick={() => handleDelete(client.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Clients;