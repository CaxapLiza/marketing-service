import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, Get, GetList, Update} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";

const Client = () => {
  const { id } = useParams()

  const [name, setName] = useState("");
  const [correspondentAccount, setCorrespondentAccount] = useState("");
  const [checkingAccount, setCheckingAccount] = useState("");
  const [address, setAddress] = useState("");
  const [TINorKPP, setTINorKPP] = useState("");
  const [BIK, setBIK] = useState("");

  useEffect(() => {
    id && Get(id, "clients", 8081)
      .then(res => {
        setName(res.name);
        setCorrespondentAccount(res.correspondent_account);
        setCheckingAccount(res.checking_account);
        setAddress(res.address);
        setTINorKPP(res.TIN_or_KPP);
        setBIK(res.BIK);
      })
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "Имя", type: "text", state: name, setState: setName},
    {id: 1, label: "ИНН", type: "text", state: TINorKPP, setState: setTINorKPP},
    {id: 2, label: "Адрес", type: "text", state: address, setState: setAddress},
    {id: 3, label: "БИК", type: "text", state: BIK, setState: setBIK},
    {id: 4, label: "Рассчётный счёт", type: "text", state: checkingAccount, setState: setCheckingAccount},
    {id: 5, label: "Корреспондентский счёт", type: "text", state: correspondentAccount, setState: setCorrespondentAccount},
  ]

  const nav = useNavigate();

  const handleUpdate = () => {
    const newData = {
      name: name,
      tin_or_kpp: TINorKPP,
      address: address,
      bik: BIK,
      checking_account: checkingAccount,
      correspondent_account: correspondentAccount
    };
    Update(id, newData, "clients", 8081)
      .then()
      .catch(err => console.log(err));
    nav("/clients");
  }

  const handleCreate = () => {
    const newData = {
      name: name,
      tin_or_kpp: TINorKPP,
      address: address,
      bik: BIK,
      checking_account: checkingAccount,
      correspondent_account: correspondentAccount
    };
    Create(newData, "clients", 8081)
      .then()
      .catch(err => console.log(err));
    nav("/clients");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={id ? handleUpdate : handleCreate} selects={[]}/>
  );
};

Client.propTypes = {
  id: PropTypes.number
};

export default Client;