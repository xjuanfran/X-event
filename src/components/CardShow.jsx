import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";
import { UseEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/cardShow.css";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

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

  return (
    <section className="containerShowEvent">
      {listEvents.length > 0
        ? listEvents.map((event) => (
            <Card
              sx={{
                width: 500,
                marginRight: ".5rem",
                height: expanded[event.id] ? "auto" : 350, // Ajusta el valor de altura según necesites
                transition: "height 0.3s ease", // Agrega una transición suave
              }}
              key={event.id}
              className="card"
            >
              <div>
                <Typography level="title-lg">{event.name}</Typography>
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
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, quaerat exercitationem quod architecto sapiente maiores tenetur quis vel debitis saepe voluptatibus quia sit atque quas neque, ut nisi quam totam!
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
                      aria-label="Explore Bahamas Islands"
                      sx={{
                        ml: "auto",
                        alignSelf: "center",
                        fontWeight: 600,
                        backgroundColor: "rgb(101, 101, 238)",
                      }}
                    >
                      Agregar participantes
                    </Button>
                  </div>
                ) : null}
              </Collapse>
            </Card>
          ))
        : null}
    </section>
  );
}
