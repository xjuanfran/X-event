import React from 'react'
import FormComponent from '../components/FormComponent'

const Register = () => {

  const fields = [
    { type: "text", name: "name", placeholder: "Nombre" },
    { type: "text", name: "lastname", placeholder: "Apellido" },
    { type: "text", name: "nickname", placeholder: "Nombre de usuario" },
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