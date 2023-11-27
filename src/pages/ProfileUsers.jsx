import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import "../styles/profile.css";

function ProfileUsers() {
  const { searchUser, user } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [sameUser, setSameUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        // console.log(decodedToken);
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
    if (tokenInfo?.sub === searchUser?.id) {
      setSameUser(true);
    } else {
      setSameUser(false);
    }
  }, [tokenInfo, searchUser]);

  useEffect(() => {
    if (searchUser == null || searchUser == "undefined") setUserNotFound(true);
    else setUserNotFound(false);
  }, [searchUser]);

  const handleSend = async () => {
    console.log("enviando solicitud");
    console.log(searchUser);
    const infoUser = {
      contact: searchUser.id,
      userId: tokenInfo.sub,
      state: "pending",
    };
    console.log(infoUser);
    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoUser),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="profile-container">
      <div className="center-card">
        {!userNotFound ? (
          <div className="card-container">
            <div className="card-image">
              <img src={`${searchUser?.photo}`} alt="Foto de perfil" />
            </div>
            <div className="card-details">
              <h1>Datos personales</h1>
              <p>Nickname: {searchUser?.nickName}</p>
              <p>
                Nombre y apellido:{" "}
                {`${searchUser?.firstName} ${searchUser?.lastName}`}
              </p>
              <p>Email: {searchUser?.email}</p>
              {!sameUser ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ backgroundColor: "rgb(101, 101, 238)" }}
                  onClick={handleSend}
                >
                  Agregar contacto
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <div className="card-container">
              <h1>
                ¡Oops! No se logro encontrar el usuario, por favor verifica el
                nickName e intenta nuevamente
              </h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileUsers;
