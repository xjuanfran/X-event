import { createContext, useContext } from "react";

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
  
  return (
    <EventContext.Provider
      value={{
        event,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
