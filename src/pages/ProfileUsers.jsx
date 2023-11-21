import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';

function ProfileUsers() {

  const { searchUser } = useAuth();
  const [infouser, setInfouser] = useState(null);

  useEffect(() => {
    console.log(searchUser);
  }, [searchUser]);


  // const loadUser = async () => {
  //   try {
  //     console.log("Cargando datos del usuario...");
  //     const user = await fetch("https://x-event.onrender.com/user/byNickName/rod");
  //     const data = await user.json();
  //     console.log(data[0]);
  //     setInfouser(data[0]);
  //   } catch (error) {
  //     console.error("Error al cargar los datos del usuario:", error);
  //   }
  // };
  

  // useEffect(() => {
  //   loadUser();
  // }, []);

  return (
    <section className="profile-container">
      <div className="center-card">
        <div className="card-container">
          <div className="card-image">
            <img src={`${searchUser?.photo}`} alt="Foto de perfil" />
          </div>
          <div className="card-details">
            <h1>Datos personales</h1>
            <p>Nickname: {searchUser?.nickName}</p>
            <p>
              Nombre y apellido:{" "}
              {`${searchUser?.firstName} ${infouser?.lastName}`}
            </p>
            <p>Email: {searchUser?.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileUsers