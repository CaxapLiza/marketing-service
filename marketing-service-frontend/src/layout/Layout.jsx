import {Outlet, useLocation} from "react-router";
import './Layout.css'
import {Link} from "react-router-dom";

const Layout = () => {
  const links = [
    {id: 2, link: "clients", text: "Клиенты"},
    {id: 5, link: "services", text: "Услуги"},
    {id: 3, link: "contracts", text: "Договоры"},
    {id: 0, link: "projects", text: "Проекты"},
    {id: 1, link: "analytics", text: "Аналитика"},
    {id: 4, link: "resources", text: "Ресурсы"}
  ];

  const location = useLocation();

  return (
    <>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <Link
              className={location.pathname.includes(link.link) ? 'active-link' : 'inactive-link'}
              to={`/${link.link}`}>{link.text}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
};

export default Layout;