import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import React, { useEffect, useState } from "react";
import { UseEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/cardShow.css";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardShow() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getEventByUserCreator, eventUser, getActivityUser, activityUser } =
    UseEvent();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [listEvents, setListEvents] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [contact, setContact] = useState([]);
  const [eventIdGlobal, setEventIdGlobal] = useState(null);

  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "#141514"
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
        //console.log(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (tokenInfo) {
      if (window.location.pathname === "/")
        getEventByUserCreator(tokenInfo.sub);
      else getActivityUser(tokenInfo.sub);
    }
  }, [tokenInfo]);

  useEffect(() => {
    const events = eventUser ? [...eventUser] : [];
    const activities = activityUser
      ? activityUser.map((activity) => ({
        ...activity,
        photo:
          "	https://images.pexels.com/photos/5935232/pexels-photo-5935232.jpeg?auto=compress&cs=tinysrgb&w=600",
      }))
      : [];

    setListEvents(window.location.pathname === "/" ? events : activities);
    console.log(events);
  }, [eventUser, activityUser]);

  const handleExpandClick = (cardId) => {
    //console.log("Expanding card with ID:", cardId);
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [cardId]: !prevExpanded[cardId],
    }));
  };

  const handleActivity = (eventId) => {
    navigate(`/eventsActivities/${eventId}`);
  };

  const handleSendInvitation = (eventId) => {
    console.log("evento Id " + eventId);
    setEventIdGlobal(eventId);
    setOpenModal(true);
  };

  const loadContacts = async () => {
    try {
      console.log(tokenInfo.sub);
      //esperar a nico para get de userIF y contactId
      const resContacts = await fetch(`https://x-event.onrender.com/contact/byUserId/1`);
      const dataContacts = await resContacts.json();
      console.log(dataContacts);
      setContact(dataArray);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
    }
  };

  useEffect(() => {
    if (tokenInfo)loadContacts();
  }, [tokenInfo]);

  const handleAddUserEvent = async (contactId) => {
    console.log("contacto Id " + contactId);  
    console.log(eventIdGlobal);
    const bodyParticipant = {
      eventId: eventIdGlobal,
      userId: contactId,
      state: "pending",
      cost: 0,
    };
    const res = await fetch("https://x-event.onrender.com/participant/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParticipant),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <section className="containerShowEvent">
      {listEvents.length > 0
        ? listEvents.map((event) => (
          <Card
            sx={{
              width: 300,
              marginRight: ".5rem",
              marginBottom: "1rem",
              height: expanded[event.id] ? "auto" : 350,
              transition: "height 0.3s ease",
            }}
            key={event.id}
            className="card"
          >
            <div>
              <Typography level="title-lg">{event.name}</Typography>
              <Typography level="body-sm">Precio total del evento ${event.cost}</Typography>
              <Typography level="body-sm">{event.createdAt}</Typography>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={event.photo}
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <ExpandMore
              id={event.id}
              expand={expanded[event.id]}
              onClick={() => handleExpandClick(event.id)}
              aria-expanded={expanded[event.id]}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded[event.id]} timeout="auto" unmountOnExit>
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="title-lg">Descripción</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography level="title-lg">Participantes</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla, quaerat exercitationem quod architecto sapiente
                    maiores tenetur quis vel debitis saepe voluptatibus quia
                    sit atque quas neque, ut nisi quam totam!
                  </Typography>
                </div>
              </CardContent>
              {window.location.pathname === "/" ? (
                <div>
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{
                      ml: "auto",
                      alignSelf: "center",
                      fontWeight: 600,
                      marginRight: "1rem",
                      marginTop: "1rem",
                      backgroundColor: "rgb(101, 101, 238)",
                    }}
                    onClick={() => handleActivity(event.id)}
                  >
                    Ver actividades
                  </Button>
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    sx={{
                      ml: "auto",
                      alignSelf: "center",
                      fontWeight: 600,
                      backgroundColor: "rgb(101, 101, 238)",
                      marginTop: ".5rem",
                    }}
                    onClick={() => handleSendInvitation(event.id)}
                  >
                    Agregar participantes
                  </Button>
                </div>
              ) : null}
            </Collapse>
          </Card>
        ))
        : (
          <div className="cart-container">
            <div className="cart-item">
              <div className="cart-item-details center">
                {
                  window.location.pathname === "/activity" ? (
                    <h2>No hay actividades para mostrar, comienza creando una</h2>
                  ) : null
                }
                {
                  window.location.pathname === "/" ? (
                    <h2>No hay eventos para mostrar, comienza creando uno</h2>
                  ) : null
                }
                <div className="button-align">
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    sx={{
                      fontWeight: 100,
                      backgroundColor: "rgb(101, 101, 238)",
                    }}
                    onClick={() => navigate("/create-event")}
                  >
                    Crear evento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }
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
            className="titleContact"
            style={{ marginBottom: '16px' }} 
          >
            Invitar contactos
          </Typography>
          <div style={{ maxHeight: '30vh', overflowY: 'auto' }} className="scroll">
            {contact.map((contact, index) => (
              <ul key={index}>
                <li className="contactItems">
                  {contact.firstName + " " + contact.lastName}
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "rgb(101, 101, 238)",
                    }}
                    onClick={() => handleAddUserEvent(contact.id)}
                  >
                    Invitar
                  </Button>
                </li>
              </ul>
            ))}
          </div>
        </Box>
      </Modal>
    </section>
  );
}
