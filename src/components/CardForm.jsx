import React, { useEffect, useState } from "react";
import { UseEvent } from "../context/EventContext";
import { UseActivity } from "../context/ActivityContext";
import { useForm } from "react-hook-form";
import "../styles/cardForm.css";
import { Autocomplete, Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import { Textarea } from "@mui/joy";
import { PhotoCamera } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const CardForm = ({ fields, showImage = true, showActivity = false, showComboBox = false, buttonName }) => {
  const { register, handleSubmit } = useForm();
  const { createEvent, getEventByUserCreator, eventUser } = UseEvent();
  const { createActivity } = UseActivity();
  const { user } = useAuth();
  const [previewImg, setPreviewImg] = useState(null);
  const [cancelImg, setCancelImg] = useState(false);
  const [img, setImg] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [listEvents, setListEvents] = useState([]);
  const [eventId, setEventId] = useState(null);

  const defaultImage =
    "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const handleChangeOption = (event, value) => {
    //console.log(event);
    //console.log(value.id);
    setEventId(value.id);
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        //console.log(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (tokenInfo) {
      getEventByUserCreator(tokenInfo.sub);
    }
  }, [tokenInfo]);

  useEffect(() => {
    if (eventUser === null) return;
    const events = eventUser.map((event) => {
      //console.log(event.id);
      //console.log(event.name);
      return { label: event.name, id: event.id };
    });

    setListEvents(events);
  }, [eventUser]);

  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    console.log(file);
    //If the user cancel the image, set the default image
    if (!file) {
      //console.log("cancel image");
      setPreviewImg("https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
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

  const onSubmit = handleSubmit(async (data) => {
    //console.log(tokenInfo);
    const path = window.location.pathname;
    //console.log(data);
    if (path === "/create-event") {
      data.creator = tokenInfo.sub;
      data.cost = 0;
      await createEvent(data, img, defaultImage, cancelImg);
    }
    if (path === "/create-activity") {
      data.eventId = eventId;
      data.creatorId = tokenInfo.sub;
      data.state = "Pendiente";
      await createActivity(data);
    }
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

  const comboBox = showComboBox && (
    <Autocomplete
      disablePortal
      fullWidth
      sx={{
        marginBottom: ".7rem",
        backgroundColor: "#52525B",
        borderRadius: "5px",
        "& .MuiInputBase-root": {
          color: "white",
          "& .MuiAutocomplete-endAdornment": {
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
      }}
      id="combo-box-demo"
      options={listEvents}
      onChange={handleChangeOption}
      renderInput={(params) => (
        <TextField {...params} label="Evento asociado" />
      )}
    />
  );

  const uploadImage = showImage && (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Typography
        sx={{ fontWeight: "medium", textAlign: "center", fontSize: 15 }}
      >
        Foto del evento
      </Typography>
      <IconButton color="inherit" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          name="photo"
          {...register("photo")}
          onChange={handleChangeImage}
        />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );

  const imagePreview =
    showImage &&
    (previewImg ? (
      <img alt="Foto del evento" src={previewImg} />
    ) : (
      <img alt="Foto evento predeterminada" src={defaultImage} />
    ));

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

  const photoActivity =
    "https://images.pexels.com/photos/5935232/pexels-photo-5935232.jpeg?auto=compress&cs=tinysrgb&w=600";
  const showPreviewActivity = showActivity && (
    <img alt="Foto de la actividad" src={photoActivity} />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-container">
        <div className="card-image">
          {imagePreview}
          {showPreviewActivity}
          {uploadImage}
        </div>
        <div className="card-details">
          {input}
          {textArea}
          {comboBox}
          <div className="quantity-container"></div>
          {buttonCard}
        </div>
      </div>
    </form>
  );
};

export default CardForm;
