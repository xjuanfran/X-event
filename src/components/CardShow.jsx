import React, { useEffect, useState } from "react";
import { UseEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/cardShow.css";

const CardShow = () => {
  const { user } = useAuth();
  const { getEventByUser, eventUser } = UseEvent();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [listEvents, setListEvents] = useState([]);

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
      getEventByUser(tokenInfo.sub);
    }
  }, [tokenInfo]);

  useEffect(() => {
    if (eventUser === null) return;
    const events = eventUser.map((event) => {
      return event;
    });
    setListEvents(events);
    console.log(events);
  }, [eventUser]);

  return (
    <section className="container-shopping">
      <div className="title">
        <h1>Eventos</h1>
      </div>
      {listEvents?.length > 0 ? (
        <div className="cart-container">
          {listEvents.map((item, index) => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-image">
                <img src={item.photo} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Tipo de evento: {item.type}</p>
                <p>
                  Descripcion: {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-item">
            <div className="cart-item-details center">
              <h2>No hay eventos por mostrar</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus dolor obcaecati nam dignissimos voluptate doloremque
                veniam, molestiae, aut tempora reprehenderit nisi dolorem odio
                quis sed eveniet quas autem assumenda libero.
              </p>
              <div className="button-align">
                <button onClick={""}>Crear un evento</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardShow;
