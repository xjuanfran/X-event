import React, { useEffect, useState } from 'react'

function ProfileUsers() {

  const [infouser, setInfouser] = useState(null);

  const loadUser = async () => {
    const user = await fetch("https://x-event.onrender.com/user/byNickName/rod");
    const data = await user.json();
    console.log(data);
    setInfouser(data);
  }


  useEffect(() => {
    loadUser();
  }, []);


  return (

    <section className="profile-container">
      <div className="center-card">
        <div className="card-container">
          <div className="card-image">
            <img src={`${infouser?.photo}`} alt="Foto de perfil" />
          </div>
          <div className="card-details">
            <h1>Datos personales</h1>
            <p>Nickname: {infouser?.nickName}</p>
            <p>
              Nombre y apellido:{" "}
              {`${infouser?.firstName} ${infouser?.lastName}`}
            </p>
            <p>Email: {infouser?.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileUsers