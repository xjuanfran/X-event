import { PhotoCamera, Upload } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField, Typography, } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";


const FormComponent = ({fields,showPhotoInput = true,showImage = true,buttonName,}) => {
  const { register, handleSubmit } = useForm();
  const [img, setImg] = useState(null);

  const onSubmit = handleSubmit(async (values) => {
    //when use de cloudinary API, change logic for send the image depending of the if user send a image or not, for the moment, the image is send by default
    values.photo = defaultImage;
    const formData = new FormData();
    formData.append("file", defaultImage);
    formData.append("upload_preset", "xqabu9la");
    formData.append("folder", "X-event");
    const responseClaudinary = await fetch(
      "https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload",
      {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      }
    );
    const data = await responseClaudinary.json();
    console.log(data);

    const response = await registerRequest(values);
    console.log(response);
  });

  //Generate a random image for the user
  const randomImages = Math.random();
  const defaultImage = `https://robohash.org/${randomImages}`;

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
  ))

  const imageUser = showPhotoInput && (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Typography
        sx={{ fontWeight: "medium", textAlign: "center", fontSize: 15 }}
      >
        Foto identificacion
      </Typography>
      <IconButton
        color="inherit"
        aria-label="upload picture"
        component="label"
      >
        <input
          hidden
          accept="image/*"
          type="file"
          name="photo"
          {...register("photo")}
        />
        <PhotoCamera />
      </IconButton>
    </Stack>
  )

  const uploadImage = showImage && (
    <img
      alt="Foto perfil predeterminada"
      style={{
        borderRadius: "100%",
        width: "8rem",
      }}
      src={defaultImage}
    />
  )

  return (
    <section className="flex h-[calc(100vh)] items-center justify-center">
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

          <Button
            variant="contained"
            type="submit"
            style={{
              width: "100%",
            }}
          >
            {buttonName}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormComponent;
