import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../styles/navBar.css";

const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (route && selectedItem !== route) {
      console.log(route);
      navigate(route);
    }
  }, [route, selectedItem]);

  const items = [
    { name: "X Event", route:"/visitHome", icon: "fa-solid fa-house" },
    { name: "Eventos", icon: "fa-solid fa-people-group",
      subItems: [
        { name: "Crear eventos", route:"/create-event", icon: "fa-regular fa-calendar-plus" },
        { name: "Ver Eventos", icon: "fa-solid fa-eye" },
      ],
    },
    {
      name: "Actividades",
      icon: "fa-solid fa-person-skating",
      subItems: [
        { name: "Crear Actividad", icon: "fa-regular fa-calendar-plus" },
        { name: "Ver Actividades", icon: "fa-solid fa-eye" },
      ],
    },
    { name: "Contactos", route:"/contacts", icon: "fa-solid fa-address-book" },
    { name: "Perfil", icon: "fa-solid fa-circle-user" },
    { name: "Cerrar sesión", icon: "fa-solid fa-right-from-bracket" },
  ];

  const handleSelect = (selected, route) => {
    console.log(route);
    if(route == "/create-event")navigate("/create-event");
    if(route == "/create-activity")navigate("/create-activity");
    setSelectedItem(selected);
    setRoute(route);
  };
  
  const renderSubItems = (subItems) => {
    return subItems.map((subItem, index) => (
      <NavItem eventKey={subItem.name} key={index} onSelect={()=> handleSelect(subItem.name, subItem.route)}>
        <NavIcon>
          <i className={`${subItem.icon}`} style={{ fontSize: "1.2em" }}></i>
        </NavIcon>
        <NavText style={{ fontSize: "1.1em" }}>{subItem.name}</NavText>
      </NavItem>
    ));
  };

  const options = items.map((item, index) => (
    <NavItem eventKey={item.name} key={index} onSelect={() => handleSelect(item.name, item.route)}>
      <NavIcon>
        <i className={`${item.icon}`} style={{ fontSize: "1.7em", color: "white" }}></i>
      </NavIcon>
      <NavText style={{ fontSize: "1.5em", color: "white" }}>{item.name}</NavText>
      {item.subItems && selectedItem === item.name && <Nav>{renderSubItems(item.subItems)}</Nav>}
    </NavItem>
  ));

  return (
    <SideNav className="sideNav">
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        {options}
      </SideNav.Nav>
    </SideNav>
  );
};

export default NavBar;
