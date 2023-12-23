import {useEffect, useState} from "react";
import {Create, Delete, Get, GetList, GetListById, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";
import {formatDateFromBack, formatDateFromFront} from "../../formatDate.js";
import Input from "../../ui/form/Input.jsx";
import Select from "../../ui/form/Select.jsx";
import Button from "../../ui/Button.jsx";

const Contract = () => {
  const { id } = useParams()

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
  }

  const [dateConcluded, setDateConcluded] = useState(getDate());
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(getDate());
  const [price, setPrice] = useState(0);
  const [text, setText] = useState("");
  const [client, setClient] = useState(0);

  const [clients, setClients] = useState([]);

  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [service, setService] = useState(0);

  useEffect(() => {
    GetListById(id, "contract_services", 8083)
      .then(res => {
        res && setServices(res)
        res && res.length > 0 && setService(res[0]?.id)
        console.log(res)
      })
      .catch(err => console.log(err));
    GetList("services", 8086)
      .then(res => setAllServices(res))
      .catch(err => console.log(err));
  }, [id])

  useEffect(() => {
    id && Get(id, "contracts", 8082)
      .then(res => {
        setDateConcluded(formatDateFromBack(res.date_concluded));
        setStartDate(formatDateFromBack(res.start_date));
        setEndDate(formatDateFromBack(res.end_date));
        setPrice(res.price);
        setText(res.text);
        setClient(res.client_id);
      })
      .catch(err => console.log(err));
    GetList("clients", 8081)
      .then(res => setClients(res))
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "Дата заключения", type: "date", state: dateConcluded, setState: setDateConcluded},
    {id: 1, label: "Дата начала работы", type: "date", state: startDate, setState: setStartDate},
    {id: 2, label: "Дата окончания работы", type: "date", state: endDate, setState: setEndDate},
    {id: 3, label: "Стоимость", type: "number", state: price, setState: setPrice},
    {id: 4, label: "Комментарий", type: "textarea", state: text, setState: setText}
  ]

  const selects = [
    {id: 0, options: clients, title: "Клиент", selectedValue: client, setSelectedValue: setClient},
  ]

  const nav = useNavigate();

  const handleUpdate = () => {
    const newData = {      
      date_concluded: formatDateFromFront(dateConcluded),
      start_date: formatDateFromFront(startDate),
      end_date: formatDateFromFront(endDate),
      price: parseFloat(price),
      text: text,
      client_id: parseInt(client)
    };
    Update(id, newData, "contracts", 8082)
      .then()
      .catch(err => console.log(err));
    nav("/contracts");
  }

  const handleCreate = () => {
    const newData = {
      date_concluded: formatDateFromFront(dateConcluded),
      start_date: formatDateFromFront(startDate),
      end_date: formatDateFromFront(endDate),
      price: parseFloat(price),
      text: text,
      client_id: parseInt(client)
    };
    Create(newData, "contracts", 8082)
      .then(res => {
        nav(`/contracts/${res}`);
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    Delete(id, "contract_services", 8083)
      .then(() => {
        GetListById(id, "contract_services", 8083)
          .then(res => {
            setServices(res)
            res.length > 0 && setService(res[0]?.id)
            console.log(res)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const handleAdd = (sId) => {
    Create({
      contract_service_id: parseInt(id),
      service_id: parseInt(sId)
    }, "contract_services", 8083)
      .then(() => {
        GetListById(id, "contract_services", 8083)
          .then(res => {
            setServices(res)
            res.length > 0 && setService(res[0]?.id)
            console.log(res)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err))
  }

  const getName = (id) => {
    const foundService = allServices.find(service => service.id === id);
    return foundService?.description
  }

  return (
    <form>
      {inputs.map(input => (
        <Input key={input.id} setState={input.setState} label={input.label} type={input.type} state={input.state} />
      ))}
      {selects.map(select => (
        <Select key={select.id} options={select.options} title={select.title}
                selectedValue={select.selectedValue} setSelectedValue={select.setSelectedValue} />
      ))}
      <Button text="Генерация печатной версии" func={() => {nav(`/contracts/${id}/print`)}} />
      <div className="space" />
      {id && <div className="item">
        <Select key={service} options={allServices} title="Услуга"
                selectedValue={service} setSelectedValue={setService} />
        <div></div>
        <Button text={"Добавить"} func={() => handleAdd(service)}/>
      </div>}
      {id && services.map(service => (
        <div key={service.id} className="item">
          <div>{getName(service.service_id)}</div>
          <div></div>
          <button onClick={() => handleDelete(service.id)}>Удалить</button>
        </div>
      ))}
      <div className="space" />
      <Button text={"Сохранить"} func={id ? handleUpdate : handleCreate}/>
    </form>
  );
};

Contract.propTypes = {
  id: PropTypes.number
};

export default Contract;