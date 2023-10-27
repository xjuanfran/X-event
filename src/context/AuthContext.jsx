import { createContext, useState } from "react";
import { registerRequest, reqCloudinary } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (user) => {
    //console.log(img);
    if (img === null || cancelImg) {
      values.photo = defaultImage;
      console.log(values);
      const response = await registerRequest(values);
      console.log(response);
      return;
    }
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "xqabu9la");
    formData.append("folder", "X-event");
    const data = await reqCloudinary(formData);
    const photoCloudinary = await data.data.secure_url;
    values.photo = photoCloudinary;
    //console.log(values);

    const response = await registerRequest(values);
    console.log(response);
    setUser(response);
  };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
