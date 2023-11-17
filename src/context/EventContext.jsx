import { createContext, useContext, useState } from "react";
import { createEventRequest, getEventCreator } from "../api/event";
import { reqCloudinary } from "../api/auth";

export const EventContext = createContext();

export const UseEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
}

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [eventUser , setEventUser] = useState(null);

  const getEventByUserCreator = async (id) => {
    try {
      const response = await getEventCreator(id);
      setEventUser(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createEvent = async (event, img, defaultImage, cancelImg) => {
    try {
      //Condiction if the user don't upload an image, set the default image
      if (img === null) {
        event.photo = defaultImage;
        const response = await createEventRequest(event);
        setEvent(event)
        //console.log(response);
        console.log(response);
        return;
      }
      //If the user cancel the image, set the default image
      if (cancelImg) {
        event.photo = "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        //console.log(user);
        const response = await createEventRequest(event);
        setEvent(event)
        console.log(response);
        return;
      }
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "xqabu9la");
      formData.append("folder", "X-event");
      const data = await reqCloudinary(formData);
      const photoCloudinary = await data.data.secure_url;
      console.log(photoCloudinary);
      event.photo = photoCloudinary;

      const response = await createEventRequest(event);
      setEvent(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EventContext.Provider
      value={{
        event,
        createEvent,
        getEventByUserCreator,
        eventUser
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

