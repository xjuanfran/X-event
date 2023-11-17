import React from "react";
import Typewriter from "typewriter-effect";
import "../styles/visitHome.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VisitHome = () => {
  const navigate = useNavigate();
  const rocket =
    "https://res-console.cloudinary.com/dmvpidbrt/media_explorer_thumbnails/9affb7755bd706d1f1412333c4ebb72e/detailed";

  const textXEvent =
    "¡Bienvenido a tu nuevo destino para la creación de experiencias inolvidables! En nuestra plataforma, no solo organizamos eventos, sino que te brindamos un espacio personalizado donde puedes dar rienda suelta a tu creatividad y planificar momentos extraordinarios con tus amigos. Desde fiestas exclusivas hasta actividades emocionantes, nuestra aplicación te ofrece la libertad de diseñar encuentros únicos y compartirlos con aquellos que más aprecias. Únete a nosotros y descubre la emoción de tener tu propio centro de operaciones para la diversión, donde cada evento se convierte en una oportunidad para crear recuerdos duraderos. ¡Explora, crea y celebra con nosotros!";

  const buttonRegister = (
    <Button
      variant="contained"
      type="submit"
      sx={{backgroundColor: "rgb(90 90 247)", marginTop: "20px"}}
      onClick={() => {navigate("/register")}}
    >
      Comenzar
    </Button>
  );

  return (
    <section className="section">
      <div className="contP">
        <div className="containerTitle">
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("X-Event").pauseFor(5000).start();
            }}
            options={{
              delay: 70,
              deleteSpeed: 60,
              loop: true,
              wrapperClassName: "text",
              cursorClassName: "cursor",
            }}
          />
          <span className="textIntro">{textXEvent}</span>
          {buttonRegister}
        </div>
        <div className="floating-container">
          <img src={rocket} alt="cohete" className="floating size" />
        </div>
      </div>
    </section>
  );
};

export default VisitHome;
