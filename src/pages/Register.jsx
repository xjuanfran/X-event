import React from 'react'
import FormComponent from '../components/FormComponent'

const Register = () => {

  const fields = [
    { type: "text", name: "name" },
    { type: "email", name: "email" },
    { type: "password", name: "password" },
    { type: "password", name: "password_confirmation" },
  ];

  return (
    <FormComponent
      fields={fields}
      onSubmit={(data) => console.log(data)}
      showPhotoInput={true}
    />
  )
}

export default Register