import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./layout/Layout.jsx";
import Project from "./components/Projects/Project.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Clients from "./components/Clients/Clients.jsx";
import Client from "./components/Clients/Client.jsx";
import Services from "./components/Services/Services.jsx";
import Service from "./components/Services/Service.jsx";
import Contracts from "./components/Contracts/Contracts.jsx";
import Contract from "./components/Contracts/Contract.jsx";
import Analytics from "./components/Analytics/Analytics.jsx";
import NewAnalytic from "./components/Analytics/NewAnalytic.jsx";
import Analytic from "./components/Analytics/Analytic.jsx";
import Resources from "./components/Resources/Resources.jsx";
import Resource from "./components/Resources/Resource.jsx";
import NewResource from "./components/Resources/NewResource.jsx";
import Print from "./components/Contracts/Print.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="projects" element={<Projects />}/>
          <Route path="projects/:id" element={<Project />}/>
          <Route path="projects/new" element={<Project />}/>
          <Route path="clients" element={<Clients />}/>
          <Route path="clients/:id" element={<Client />}/>
          <Route path="clients/new" element={<Client />}/>
          <Route path="services" element={<Services />}/>
          <Route path="services/:id" element={<Service />}/>
          <Route path="services/new" element={<Service />}/>
          <Route path="contracts" element={<Contracts />}/>
          <Route path="contracts/:id" element={<Contract />}/>
          <Route path="contracts/:id/print" element={<Print />}/>
          <Route path="contracts/new" element={<Contract />}/>
          <Route path="analytics" element={<Analytics />}/>
          <Route path="analytics/:id" element={<Analytic />}/>
          <Route path="analytics/new/:id" element={<NewAnalytic />}/>
          <Route path="resources" element={<Resources />}/>
          <Route path="resources/:id" element={<Resource />}/>
          <Route path="resources/new/:id" element={<NewResource />}/>
          <Route path="*" element={<div />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
