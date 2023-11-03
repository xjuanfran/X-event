import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/cardForm.css";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import { PhotoCamera } from "@mui/icons-material";

const CardForm = ({ fields, buttonName }) => {
  const { register, handleSubmit } = useForm();

  const defaultImage =
    "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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

  const textArea = (
    <Textarea
      color="neutral"
      minRows={2}
      placeholder="Descripción"
      size="lg"
      variant="solid"
      sx={{
        marginBottom: ".7rem",
        backgroundColor: "#52525B",
        borderRadius: "5px",
        width: "100%",
      }}
      {...register("description", { required: true })}
    />
  );

  const uploadImage = (
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
        />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );

  const imagePreview = <img alt="Foto evento" src={defaultImage} />;

  const buttonCard = (
    <Button
      variant="contained"
      type="submit"
      style={{
        width: "100%",
        backgroundColor: "#141514",
      }}
    >
      {`${buttonName}`}
    </Button>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-container">
        <div className="card-image">
          {uploadImage}
          {imagePreview}
        </div>
        <div className="card-details">
          {input}
          {textArea}
          <div className="quantity-container"></div>
          {buttonCard}
        </div>
      </div>
    </form>
  );
};

export default CardForm;
