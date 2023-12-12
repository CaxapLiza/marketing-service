import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Create, GetList} from "../../api/api.js";
import {useNavigate, useParams} from "react-router";
import PropTypes from "prop-types";

const NewAnalytic = () => {
  const { id } = useParams()

  const [numberOfImpressions, setNumberOfImpressions] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [numberOfVisitors, setNumberOfVisitors] = useState(0);
  const [numberOfConversions, setNumberOfConversions] = useState(0);
  const [profit, setProfit] = useState(0);
  const [costs, setCosts] = useState(0);
  const [numberOfNewCustomers, setNumberOfNewCustomers] = useState(0);
  const [marketingCosts, setMarketingCosts] = useState(0);
  const [averageAnnualRevenuePerCustomer, setAverageAnnualRevenuePerCustomer] = useState(0);
  const [averageCustomerLifespan, setAverageCustomerLifespan] = useState(0);
  const [project, setProject] = useState(id);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    GetList("projects", 8084)
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [])

  const inputs = [
    {id: 0, label: "Количество просмотров", type: "number", state: numberOfImpressions, setState: setNumberOfImpressions},
    {id: 1, label: "Количество кликов", type: "number", state: numberOfClicks, setState: setNumberOfClicks},
    {id: 2, label: "Количество посетителей", type: "number", state: numberOfVisitors, setState: setNumberOfVisitors},
    {id: 3, label: "Количество конверсий", type: "number", state: numberOfConversions, setState: setNumberOfConversions},
    {id: 4, label: "Прибыль", type: "number", state: profit, setState: setProfit},
    {id: 5, label: "Затраты", type: "number", state: costs, setState: setCosts},
    {id: 6, label: "Количество новых клиентов", type: "number", state: numberOfNewCustomers, setState: setNumberOfNewCustomers},
    {id: 7, label: "Затраты на маркетинг", type: "number", state: marketingCosts, setState: setMarketingCosts},
    {id: 8, label: "Средний доход с клиента в год", type: "number", state: averageAnnualRevenuePerCustomer, setState: setAverageAnnualRevenuePerCustomer},
    {id: 9, label: "Среднее время жизни клиента", type: "number", state: averageCustomerLifespan, setState: setAverageCustomerLifespan},
  ]

  const selects = [
    {id: 0, title: "Проект", options: projects, selectedValue: project, setSelectedValue: setProject}
  ]

  const nav = useNavigate();

  const handleCreate = () => {
    const newData = {
      number_of_impressions: parseInt(numberOfImpressions),
      number_of_clicks: parseInt(numberOfClicks),
      number_of_visitors: parseInt(numberOfVisitors),
      number_of_conversions: parseInt(numberOfConversions),
      profit: parseFloat(profit),
      costs: parseFloat(costs),
      number_of_new_customers: parseInt(numberOfNewCustomers),
      marketing_costs: parseInt(marketingCosts),
      average_annual_revenue_per_customer: parseFloat(averageAnnualRevenuePerCustomer),
      average_customer_lifespan: parseFloat(averageCustomerLifespan),
      project_id: parseInt(project)
    };
    Create(newData, "analytics", 8080)
      .then()
      .catch(err => console.log(err));
    nav("/analytics");
  }

  return (
    <Form buttonText="Сохранить" inputs={inputs} func={handleCreate} selects={selects}/>
  );
};

NewAnalytic.propTypes = {
  id: PropTypes.number
};

export default NewAnalytic;