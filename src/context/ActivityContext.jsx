import { createContext, useContext, useState } from "react";
import { createActivityRequest } from "../api/activity";

export const ActivityContext = createContext();

export const UseActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState(null);

  const createActivity = async (activity) => {
    try {
      const response = await createActivityRequest(activity);
      setActivity(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActivityContext.Provider value={{ activity, createActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
