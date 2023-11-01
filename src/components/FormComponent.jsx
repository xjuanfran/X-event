import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/formComponent.css";

const FormComponent = ({ fields, style, showPhotoInput = true, showImage = true, buttonName }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, signIn, isRegister, errors: registerErrors, isSendForm, resetErrors } = useAuth();
  const navigate = useNavigate();
  //Use for preview the image
  const [previewImg, setPreviewImg] = useState(null);
  //Use for send the image to the server
  const [img, setImg] = useState(null);
  //Use for cancel the image and set the default image
  const [cancelImg, setCancelImg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //Hook to manage the loading state
  const [loading, setLoading] = useState(false);

  //Generate a random image for the user
  const randomImages = Math.random();
  const defaultImage = `https://robohash.org/${randomImages}`;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isRegister) {
      if (isSendForm) {
        toast.success("Registro exitoso");
      }
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [isRegister]);

  useEffect(() => {

    const errorsDb = {
      "nick_name must be unique": "Por favor intente con otro nombre de usuario",
      "email must be unique": "El correo ya esta registrado",
      '"password" length must be at least 6 characters long': 'La contraseña debe tener al menos 6 caracteres',
    }

    if (registerErrors) {
      //console.log(registerErrors);
      toast.error(errorsDb[registerErrors]);
    }
  }, [registerErrors, resetErrors]);


  const handleChange = (e) => {
    let file = e.target.files[0];
    //If the user cancel the image, set the default image
    if (!file) {
      //console.log("cancel image");
      setPreviewImg("https://robohash.org/cancel");
      setCancelImg(true);
      return;
    } else {
      //console.log("Choice the image");
      setCancelImg(false);
      setPreviewImg(file);
    }
    setPreviewImg(URL.createObjectURL(file));
    setImg(file);
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    setLoading(true);
    const path = window.location.pathname;
      if (path === "/register") await signUp(values, img, defaultImage, cancelImg);
      if (path === "/login") await signIn(values);
    setLoading(false);
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

  const inputPassword = (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        style={{ color: "white" }}
        htmlFor="outlined-adornment-password">Contraseña
      </InputLabel>
      <OutlinedInput
        name='password'
        id="outlined-adornment-password"
        inputProps={{ style: { color: "white" } }}
        type={showPassword ? 'text' : 'password'}
        sx={{ marginBottom: ".7rem", backgroundColor: "#52525B", borderRadius: "5px" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: "white" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Contraseña"
        {...register("password", { required: true })}
      />
    </FormControl>
  )

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
        backgroundColor: "#141514",
      }}
      onClick={handleButton}
    >
      {
        loading ? <CircularProgress color="info" size={25} /> : `${buttonName}`
      }
    </Button>
  );

  return (
    <section className={`${style} flex h-[calc(100vh)] items-center justify-center`}>
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <span className="text-3xl flex items-center justify-center mb-3">
          X Event
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {input}
          {inputPassword}
          {imageUser}
          <div className="flex items-center justify-center mb-3">
            {uploadImage}
          </div>
          {buttonForm}
        </form>
      </div>
      <ToastContainer autoClose={isSendForm ? 3000 : 3500} closeButton={false} />
    </section>
  );
};

export default FormComponent;
