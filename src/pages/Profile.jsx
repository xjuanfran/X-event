import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import "../styles/profile.css";


const Profile = () => {
  const { user } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        console.log(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  return (
    <section className="profile-container">
      <div className="center-card">
        <div className="card-container">
          <div className="card-image">
            <img src={`${tokenInfo?.photo}`} alt="Foto de perfil" />
          </div>
          <div className="card-details">
            <h1>Datos personales</h1>
            <p>Nickname: {tokenInfo?.nickName}</p>
            <p>
              Nombre y apellido:{" "}
              {`${tokenInfo?.firstName} ${tokenInfo?.lastName}`}
            </p>
            <p className="emailText">Email: {tokenInfo?.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile