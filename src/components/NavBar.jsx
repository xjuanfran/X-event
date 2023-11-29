import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
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
import { useForm } from "react-hook-form";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, getPersonNick } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [infoNotification, setInfoNotification] = useState(null);

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
    width: 400,
    bgcolor: "background.paper",
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
        console.log(item.userId);
        const res = await fetch(
          `https://x-event.onrender.com/user/${item.userId}`
        );
        const data = await res.json();
        console.log(data);
        return data; // Retorna el resultado de cada llamada a la API
      })
    );
    console.log(newData);
    setInfoNotification(newData);
  };

  useEffect(() => {
    console.log(infoNotification);
    if (tokenInfo) contactNotification();
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
                            <MailIcon />
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
                          >
                            Notificaciones
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            {infoNotification?.map((item) => (
                              <ul key={item.id}>
                                <li>item.firstName</li>
                                <Button
                                  variant="solid"
                                  size="md"
                                  color="primary"
                                  aria-label="Explore Bahamas Islands"
                                  sx={{
                                    fontWeight: 600,
                                    backgroundColor: "rgb(101, 101, 238)",
                                  }}
                                >
                                  Invitar
                                </Button>
                              </ul>
                            ))}
                          </Typography>
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
