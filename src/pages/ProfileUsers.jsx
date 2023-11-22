import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

function ProfileUsers() {

  const { searchUser } = useAuth();
  
  const handleSend = () => {
    console.log("enviando solicitud");
  }

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
              {`${searchUser?.firstName} ${searchUser?.lastName}`}
            </p>
            <p>Email: {searchUser?.email}</p>
            <Button variant="contained" color="primary" fullWidth sx={{backgroundColor:"rgb(101, 101, 238)"}} onClick={handleSend}>
              Agregar contacto
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileUsers