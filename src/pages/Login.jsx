import FormComponent from "../components/FormComponent";

const Login = () => {

  const fields = [
    { type: "email", name: "email", placeholder: "Correo electronico" },
  ];

  const buttonLogin = 'Iniciar sesion'

  return (
    <FormComponent
      fields={fields}
      showInputPass={true}
      showPhotoInput={false}
      showImage={false}
      buttonName={buttonLogin}
    />
  )
}

export default Login