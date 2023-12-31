import FormComponent from "../components/FormComponent";

const Login = () => {

  const fields = [
    { type: "email", name: "email", placeholder: "Correo electronico" },
  ];

  const buttonLogin = 'Iniciar sesion'

  return (
    <FormComponent
      fields={fields}
      style={"formLogin"}
      showPhotoInput={false}
      showImage={false}
      buttonName={buttonLogin}
      separationLogin={true}
    />
  )
}

export default Login