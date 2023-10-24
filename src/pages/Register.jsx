import React from 'react'
import FormComponent from '../components/FormComponent'

const Register = () => {

  const fields = [
    { type: "text", name: "firstName", placeholder: "Nombre" },
    { type: "text", name: "lastName", placeholder: "Apellido" },
    { type: "text", name: "nickName", placeholder: "Nombre de usuario" },
    { type: "email", name: "email", placeholder: "Correo electronico" },
    { type: "password", name: "password", placeholder: "Contraseña" }
  ];

  const buttonRegister = 'Registrarse'

  return (
    <FormComponent
      fields={fields}
      showPhotoInput={true}
      showImage
      buttonName={buttonRegister}
    />
  )
}

export default Register