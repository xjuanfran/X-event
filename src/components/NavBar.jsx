import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/navBar.scss";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (event) => {
    setAnchorEl(null);
    //console.log(event.target.innerText);
    const path = event.target.innerText;
    if(path === "Crear un evento") navigate("/create-event");
    if(path === "Ver mis eventos") navigate("/#");
    if(path === "Crear una actividad") navigate("/create-activity");
    if(path === "Ver mis actividades") navigate("/#");
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

  //if (tokenInfo) console.log(tokenInfo.firstname);

  const handleLogout = () => {
    localStorage.clear(); // Borra los datos del localStorage
    window.location.reload(); // Recarga la página
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
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

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
                  menuOpen && size.width < 768 ? "isMenu" : ""
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <ul>
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
                          <MenuItem onClick={handleClose}>Crear un evento</MenuItem>
                          <MenuItem onClick={handleClose}>Crear una actividad</MenuItem>
                          <MenuItem onClick={handleClose}>Ver mis eventos</MenuItem>
                          <MenuItem onClick={handleClose}>Ver mis actividades</MenuItem>
                        </Menu>
                      </div>
                      <li>
                        <Link
                          to="/profile"
                          data-tip="Perfil"
                          data-for="profileTooltip"
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
