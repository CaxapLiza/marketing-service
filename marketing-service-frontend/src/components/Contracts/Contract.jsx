import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, Get, GetList, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";
import {formatDateFromBack, formatDateFromFront} from "../../formatDate.js";

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
    {id: 4, label: "Текст", type: "textarea", state: text, setState: setText}
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
      .then()
      .catch(err => console.log(err));
    nav("/contracts");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={id ? handleUpdate : handleCreate} selects={selects}/>
  );
};

Contract.propTypes = {
  id: PropTypes.number
};

export default Contract;