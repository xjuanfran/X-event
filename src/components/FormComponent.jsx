import { PhotoCamera, Upload } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { registerRequest, reqCloudinary } from "../api/auth";

const FormComponent = ({
  fields,
  showPhotoInput = true,
  showImage = true,
  buttonName,
}) => {
  const { register, handleSubmit } = useForm();
  //Use for preview the image
  const [previewImg, setPreviewImg] = useState(null);
  const [img, setImg] = useState(null);

  //Generate a random image for the user
  const randomImages = Math.random();
  const defaultImage = `https://robohash.org/${randomImages}`;

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPreviewImg(defaultImage);
      setImg(defaultImage);
      return;
    }
    console.log("pase");
    setPreviewImg(URL.createObjectURL(file));
    setImg(file);
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log(img);
    console.log(values.photo);
    if (img === null) {
      console.log("entre");
      const formData = new FormData();
      formData.append("file", defaultImage);
      formData.append("upload_preset", "xqabu9la");
      formData.append("folder", "X-event");
      reqCloudinary(formData);

      const data = await reqCloudinary(formData);
      console.log(data);

    } else {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "xqabu9la");
      formData.append("folder", "X-event");
      reqCloudinary(formData);

      const data2 = await reqCloudinary(formData);
      console.log(data2);
      values.photo = data2.secure_url;
    }

    const response = await registerRequest(values);
    console.log(response);
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
