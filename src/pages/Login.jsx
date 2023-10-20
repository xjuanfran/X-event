import FormComponent from "../components/FormComponent";

const Login = () => {

  const fields = [
    { type: "email", name: "email", placeholder: "Correo electronico" },
    { type: "password", name: "password", placeholder: "Contraseña" }
  ];

  const buttonLogin = 'Iniciar sesion'

  return (
    <FormComponent
      fields={fields}
      showPhotoInput={false}
      showImage={false}
      buttonName={buttonLogin}
    />
  )
}

export default Login