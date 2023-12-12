import Form from "../../ui/form/Form.jsx";
import {useEffect, useState} from "react";
import {Get, GetList} from "../../api/api.js";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router";

const Analytic = () => {
  const { id } = useParams()

  const [CTR, setCTR] = useState(0);
  const [conversationRate, setConversationRate] = useState(0);
  const [ROI, setROI] = useState(0);
  const [CAC, setCAC] = useState("0");
  const [LTV, setLTV] = useState(0);
  const [project, setProject] = useState(0);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    id && Get(id, "analytics", 8080)
      .then(res => {
        setCTR(res.ctr);
        setConversationRate(res.conversation_rate);
        setROI(res.roi);
        setCAC(res.cac);
        setLTV(res.ltv);
        setProject(res.project_id);
      })
      .catch(err => console.log(err));
    GetList("projects", 8084)
      .then(res => setProjects(res))
      .catch(err => console.log(err));
  }, [id]);

  const inputs = [
    {id: 0, label: "CTR", type: "text", state: CTR, setState: setCTR},
    {id: 1, label: "Conversation rate", type: "text", state: conversationRate, setState: setConversationRate},
    {id: 2, label: "ROI", type: "text", state: ROI, setState: setROI},
    {id: 3, label: "CAC", type: "text", state: CAC, setState: setCAC},
    {id: 4, label: "LTV", type: "text", state: LTV, setState: setLTV},
  ]

  const selects = [
    {id: 0, title: "Проект", options: projects, selectedValue: project, setSelectedValue: setProject}
  ]

  const nav = useNavigate();

  const handleBack = () => {
    nav("/analytics");
  }

  return (
    <Form buttonText="Закрыть" inputs={inputs} func={handleBack} selects={selects}/>
  );
};

Analytic.propTypes = {
  id: PropTypes.number
};

export default Analytic;