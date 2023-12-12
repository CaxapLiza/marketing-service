import {useEffect, useState} from "react";
import {Delete, GetList} from "../../api/api.js";
import {useNavigate} from "react-router";
import '../Items.css'

const Contracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    GetList("contracts", 8082)
      .then(res => setContracts(res))
      .catch(err => console.log(err));
  }, [])

  const nav = useNavigate();

  const handleCreate = () => {
    nav("/contracts/new");
  }

  const handleUpdate = (id) => {
    nav(`/contracts/${id}`);
  }

  const handleDelete = (id) => {
    Delete(id, "contracts", 8082)
      .then(() => setContracts(contracts.filter(contract => contract.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <button onClick={handleCreate}>Добавить</button>
      {contracts.map(contract => (
        <div key={contract.id} className="item">
          <div>{contract.text}</div>
          <button onClick={() => handleUpdate(contract.id)}>Редактировать</button>
          <button onClick={() => handleDelete(contract.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default Contracts;