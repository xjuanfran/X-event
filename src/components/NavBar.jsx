import React, { useEffect, useState } from "react";
import { BiFontSize, BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/navBar.scss";
import { Badge, Box, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { set, useForm } from "react-hook-form";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, getPersonNick } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [infoNotification, setInfoNotification] = useState(null);
  const [notificationEvents, setNotificationEvents] = useState(null);
  const [eventIdentification, setEventId] = useState(null);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = handleSubmit(async (data) => {
    await getPersonNick(data.nickName);
    navigate("/profileUsers");
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    maxHeight: "80vh",
    bgcolor: "#141514",
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    //console.log(event.target.innerText);
    const path = event.target.innerText;
    if (path === "Crear un evento") navigate("/create-event");
    if (path === "Crear una actividad") navigate("/create-activity");
    if (path === "Ver mis actividades") navigate("/activity");
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    window.location.reload(); // Reload page
  };

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 860 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const contactNotification = async () => {
    console.log("contactando al server");
    //console.log(tokenInfo);
    const res = await fetch(`https://x-event.onrender.com/contact/`);
    const data = await res.json();
    //console.log(data);
    const contacts = data.filter((item) => item.contact === tokenInfo.sub);
    //console.log(contacts);
    const notifications = contacts.filter((item) => item.state === "pending");
    console.log(notifications);
    const newData = await Promise.all(
      notifications.map(async (item) => {
        //console.log(item.userId);
        const res = await fetch(
          `https://x-event.onrender.com/user/${item.userId}`
        );
        const data = await res.json();
        console.log(data);
        return data;
      })
    );
    console.log(newData);
    setInfoNotification(newData);
  };

  useEffect(() => {
    if (tokenInfo) contactNotification();
  }, [tokenInfo]);

  const handleAccept = async (userId) => {
    console.log("aceptando" + userId);
    console.log(tokenInfo.sub);
    const res = await fetch(
      `https://x-event.onrender.com/contact/byUserId/${userId}/contact/${tokenInfo.sub}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: "accepted" }),
      }
    );
    const data = await res.json();
    console.log(data);
    const updatedNotifications = infoNotification.filter(
      (item) => item.id !== userId
    );
    setNotificationEvents(updatedNotifications);
  };

  const handleAcceptEvent = async (creator) => {
    console.log("aceptando evento " + creator);
    const reqGetEvent = await fetch(
      `https://x-event.onrender.com/event/byUser/${creator}`
    );
    const dataEvent = await reqGetEvent.json();
    console.log(dataEvent);
    for (let eventIds of dataEvent) {
      console.log(eventIds);
      const reqGetParticipant = await fetch(
        `https://x-event.onrender.com/participant/byEvent/${eventIds.id}`
      );
      console.log(reqGetParticipant.status);
      if (reqGetParticipant.status === 500) {
        console.log("No found participants in this event");
      }
      const dataParticipant = await reqGetParticipant.json();
      console.log(dataParticipant);
    }

    // const res = await fetch(`https://x-event.onrender.com/participant/acceptParticipantion/${tokenInfo.sub}/${eventId}`,
    //   {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ state: "accepted" }),
    //   }
    // );
    // const data = await res.json();
    // console.log(data);
  };

  const handleReject = async (userId) => {
    console.log("rechazando" + userId);
    const res = await fetch(
      `https://x-event.onrender.com/contact/byUserId/${userId}/contact/${tokenInfo.sub}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: "rejected" }),
      }
    );
    const data = await res.json();
    console.log(data);
    const updatedNotifications = infoNotification.filter(
      (item) => item.id !== userId
    );
    setInfoNotification(updatedNotifications);
  };

  const participantsNotification = async () => {
    console.log("contactando al server");
    const res = await fetch("https://x-event.onrender.com/participant/");
    const data = await res.json();
    console.log(data);

    let arrayParticipants = [];
    data.map(async (item) => {
      if (item.userId === tokenInfo.sub && item.state === "pending") {
        console.log(item);
        arrayParticipants.push(item);
      }
    });
    const eventIds = arrayParticipants.map((item) => item.eventId);
    setEventId(eventIds);

    let arrayCreatorInvitation = [];

    for (let eventId of arrayParticipants) {
      const res = await fetch(
        `https://x-event.onrender.com/event/${eventId.eventId}`
      );
      const data = await res.json();
      console.log(data);
      arrayCreatorInvitation.push(data);
    }
    console.log(arrayCreatorInvitation);

    let arrayCreator = [];
    for (let creatorId of arrayCreatorInvitation) {
      const res = await fetch(
        `https://x-event.onrender.com/user/${creatorId.creator}`
      );
      const data = await res.json();
      console.log(data);
      arrayCreator.push(data);
    }
    console.log(arrayCreator);
    setNotificationEvents(arrayCreator);
  };

  useEffect(() => {
    if (tokenInfo) participantsNotification();
  }, [tokenInfo]);

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/visitHome" className="header__content__logo">
          X Event
        </Link>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <>
              <nav
                className={`header__content__nav ${
                  menuOpen && size.width < 860 ? "isMenu" : ""
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <ul>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <li className="search">
                          <input
                            className="form-control mr-sm-2 size"
                            type="search"
                            placeholder="Buscar un contacto"
                            aria-label="Search"
                            {...register("nickName")}
                          />
                          <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                          >
                            Buscar
                          </button>
                        </li>
                      </form>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <div>
                        <Button
                          id="basic-button"
                          sx={{ color: "white" }}
                          className="btnEvent"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          Eventos
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            Crear un evento
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            Crear una actividad
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            Ver mis actividades
                          </MenuItem>
                        </Menu>
                      </div>
                      <li>
                        <Link
                          to="/profile"
                          data-tip="Perfil"
                          data-for="profileTooltip"
                          className="profilePhoto"
                        >
                          {tokenInfo.firstName + " " + tokenInfo.lastName}
                          <img
                            src={tokenInfo.photo}
                            className="fotoPerfil"
                            alt="Foto de perfil"
                          />
                        </Link>
                        {/* <tool-tip role="tooltip">Perfil</tool-tip> */}
                      </li>
                      <li>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={handleOpen}
                        >
                          <Badge badgeContent={1} color="secondary">
                            <i className="fa-solid fa-bell"></i>
                          </Badge>
                        </IconButton>
                      </li>
                      <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="titleNotification"
                          >
                            <i className="fa-solid fa-bell"></i>
                            &nbsp; Notificaciones
                          </Typography>
                          <div
                            style={{ maxHeight: "30vh", overflowY: "auto" }}
                            className="scrollNotification"
                          >
                            {infoNotification && infoNotification.length > 0 ? (
                              infoNotification.map((item, index) => (
                                <ul key={index} className="notificationItems">
                                  <div>
                                    <li>
                                      {item.firstName +
                                        " " +
                                        item.lastName +
                                        " te quiere agregar como contacto"}
                                    </li>
                                  </div>
                                  <div>
                                    <Button
                                      variant="solid"
                                      size="md"
                                      color="primary"
                                      sx={{
                                        fontWeight: 600,
                                        backgroundColor: "rgb(101, 101, 238)",
                                      }}
                                      onClick={() => handleAccept(item.id)}
                                    >
                                      Aceptar
                                    </Button>
                                    <Button
                                      variant="solid"
                                      size="md"
                                      color="primary"
                                      style={{ marginLeft: ".5rem" }}
                                      sx={{
                                        fontWeight: 600,
                                        backgroundColor: "rgb(101, 101, 238)",
                                      }}
                                      onClick={() => handleReject(item.id)}
                                    >
                                      Rechazar
                                    </Button>
                                  </div>
                                </ul>
                              ))
                            ) : (
                              <h1
                                style={{
                                  fontSize: "1rem",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                De momento sin Notificaciones
                              </h1>
                            )}
                            {notificationEvents && notificationEvents.length > 0
                              ? notificationEvents.map((item, index) => (
                                  <ul key={index} className="notificationItems">
                                    <div>
                                      <li>
                                        {item.firstName +
                                          " " +
                                          item.lastName +
                                          " Te invito a un evento"}
                                      </li>
                                    </div>
                                    <div>
                                      <Button
                                        variant="solid"
                                        size="md"
                                        color="primary"
                                        sx={{
                                          fontWeight: 600,
                                          backgroundColor: "rgb(101, 101, 238)",
                                        }}
                                        onClick={() =>
                                          handleAcceptEvent(item.id)
                                        }
                                      >
                                        Aceptar
                                      </Button>
                                      <Button
                                        variant="solid"
                                        size="md"
                                        color="primary"
                                        style={{ marginLeft: ".5rem" }}
                                        sx={{
                                          fontWeight: 600,
                                          backgroundColor: "rgb(101, 101, 238)",
                                        }}
                                        onClick={() =>
                                          handleRejectEvent(item.id)
                                        }
                                      >
                                        Rechazar
                                      </Button>
                                    </div>
                                  </ul>
                                ))
                              : null}
                          </div>
                        </Box>
                      </Modal>
                      <li>
                        <button
                          className="btn btn__logout"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <Link to="/login">
                        <button className="btn btn__login">
                          Inicia sesión
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="btn">Inscríbete</button>
                      </Link>
                    </ul>
                  </>
                )}
              </nav>
              <div className="header__content__toggle">
                {!menuOpen ? (
                  <BiMenuAltRight onClick={menuToggleHandler} />
                ) : (
                  <AiOutlineClose onClick={menuToggleHandler} />
                )}
              </div>
            </>
          )}
      </div>
    </header>
  );
}

export default Navbar;
