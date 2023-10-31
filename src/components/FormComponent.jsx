import { PhotoCamera } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormComponent = ({
  fields,
  showPhotoInput = true,
  showImage = true,
  buttonName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isRegister, errors: registerErrors, isSendForm } = useAuth();
  const navigate = useNavigate();
  //Use for preview the image
  const [previewImg, setPreviewImg] = useState(null);
  //Use for send the image to the server
  const [img, setImg] = useState(null);
  //Use for cancel the image and set the default image
  const [cancelImg, setCancelImg] = useState(false);

  //Generate a random image for the user
  const randomImages = Math.random();
  const defaultImage = `https://robohash.org/${randomImages}`;

  useEffect(() => {
    if (isRegister){
      if (isSendForm){
        toast.success("Registro exitoso");
      }
        setTimeout(() => {
          navigate("/");
      } , 4000);
    } 
  }, [isRegister]);

  useEffect(() => {

    //Use this for translate the errors from the server
    const errorPassword = '"password" length must be at least 6 characters long';
    const errorNick = '"nickName" length must be at least 3 characters long';
    const errorEmail = '"email" must be a valid email';
    const multiError = errorPassword + ". " + errorNick;
    const multiError2 = errorEmail + ". " +  errorNick ;
    const multiError3 = errorEmail + ". " +  errorPassword ;
    const multiError4 = errorEmail + ". " +  errorPassword + ". " + errorNick;
    const errorsDb = {
      "Validation error": "Por favor intente con otro correo",
    };
  
    //Add the errors to the object, combination of the errors
    errorsDb[errorPassword] = "La contraseña debe tener al menos 6 caracteres";
    errorsDb[errorNick] = "El nombre debe tener al menos 3 caracteres";
    errorsDb[multiError] = "El nombre de usuario debe tener al menos 3 caracteres y la contraseña debe tener al menos 6 caracteres";
    errorsDb[errorEmail] = "El correo debe ser valido";
    errorsDb[multiError2] = "El correo debe ser valido y el nick debe tener al menos 3 caracteres";
    errorsDb[multiError3] = "El correo debe ser valido y la contraseña debe tener al menos 6 caracteres";
    errorsDb[multiError4] = "El nick debe tener al menos 3 caracteres, el correo debe ser valido y la contraseña debe tener al menos 6 caracteres.";
  
    if (registerErrors) {
      //console.log(registerErrors);
      toast.error(errorsDb[registerErrors]);
    }
  }, [registerErrors]);
  

  const handleChange = (e) => {
    let file = e.target.files[0];
    //If the user cancel the image, set the default image
    if (!file) {
      setPreviewImg("https://robohash.org/cancel");
      setCancelImg(true);
      return;
    }
    setPreviewImg(URL.createObjectURL(file));
    setImg(file);
  };

  const onSubmit = handleSubmit(async (values) => {
    signUp(values, img, defaultImage, cancelImg);
  });

  const input = fields.map((field, index) => (
    <TextField
      variant="outlined"
      fullWidth
      autoComplete="off"
      label={field.placeholder}
      key={index}
      type={field.type}
      sx={{
        marginBottom: ".7rem",
        backgroundColor: "#52525B",
        borderRadius: "5px",
      }}
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{ style: { color: "white" } }}
      {...register(field.name, { required: true })}
    />
  ));

  const imageUser = showPhotoInput && (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Typography
        sx={{ fontWeight: "medium", textAlign: "center", fontSize: 15 }}
      >
        Foto identificacion
      </Typography>
      <IconButton color="inherit" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          name="photo"
          {...register("photo")}
          onChange={handleChange}
        />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );

  const uploadImage =
    showImage &&
    (previewImg ? (
      <img
        alt="Foto de perfil"
        style={{
          height: "10rem",
          borderRadius: "100%",
          width: "10rem",
        }}
        src={previewImg}
      />
    ) : (
      <img
        alt="Foto perfil predeterminada"
        style={{
          borderRadius: "100%",
          width: "8rem",
        }}
        src={defaultImage}
      />
    ));

  const handleButton = () => {
    const dictionary = Object.entries(errors);
    if (dictionary.length > 0) {
      toast.error("Por favor, rellene todos los campos");
    }
  };

  const buttonForm = (
    <Button
      variant="contained"
      type="submit"
      style={{
        width: "100%",
      }}
      onClick={handleButton}
    >
      {buttonName}
    </Button>
  );

  return (
    <section className="flex h-[calc(120vh)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <span className="text-3xl flex items-center justify-center mb-3">
          X Event
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {input}
          {imageUser}
          <div className="flex items-center justify-center mb-3">
            {uploadImage}
          </div>
          {buttonForm}
        </form>
      </div>
      <ToastContainer  autoClose={isSendForm ? 3000 : 3500} closeButton={false}/>
    </section>
  );
};

export default FormComponent;
