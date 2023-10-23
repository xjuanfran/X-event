import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

const FormComponent = ({
  fields,
  showPhotoInput = true,
  showImage = true,
  buttonName,
}) => {
  const { register, handleSubmit } = useForm();

  const [img, setImg] = useState(null);

  const onSubmit = handleSubmit(async (values) => {
    //when use de cloudinary API, change logic for send the image depending of the if user send a image or not, for the moment, the image is send by default
    values.photo = defaultImage;

    console.log(values);
  });

  //"Generate a random image for the robohash API."
  const namesImages = [
    "Juan",
    "Cristian",
    "Nicolas",
    "Pedro",
    "Mariana",
    "Liss",
    "Nicol",
  ];
  const randomImages = Math.floor(Math.random() * namesImages.length);
  const defaultImage = `https://robohash.org/${randomImages}`;

  return (
    <section className="flex h-[calc(100vh)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <span className="text-3xl flex items-center justify-center mb-3">
          X Event
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
          ))}

          {showPhotoInput && (
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
          )}

          <div className="flex items-center justify-center mb-3">
            {showImage &&
              (
                <img
                  alt="Foto perfil predeterminada"
                  style={{
                    borderRadius: "100%",
                    width: "8rem",
                  }}
                  src={defaultImage}
                />
              )
              }
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
