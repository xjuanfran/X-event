import { createContext, useContext } from "react";
import { createEventRequest } from "../api/event";

const EventContext = createContext();

export const UseTasks = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useTasks must be used within an TaskProvider");
  }
  return context;
};

const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);

  const createEvent = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "xqabu9la");
      formData.append("folder", "X-event");
      const data = await reqCloudinary(formData);
      const photoCloudinary = await data.data.secure_url;
      user.photo = photoCloudinary;

      const response = await createEventRequest(user);
      setEvent(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <EventContext.Provider
      value={{
        event,
        createEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
