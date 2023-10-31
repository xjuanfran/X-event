import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, reqCloudinary } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isSendForm, setIsSendForm] = useState(false);

  const signUp = async (user, img, defaultImage, cancelImg) => {
    try {
      //Condiction if the user don't upload an image, set the default image
      if (img === null) {
        user.photo = defaultImage;
        const response = await registerRequest(user);
        //console.log(response);
        if (response) {
          setIsRegister(true);
          setIsSendForm(true);
        }
        return;
      }
      //If the user cancel the image, set the default image
      if (cancelImg) {
        user.photo = "https://robohash.org/cancel";
        //console.log(user);
        const response = await registerRequest(user);
        if (response){
          setIsRegister(true);
          setIsSendForm(true);
        } 
        return;
      }
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "xqabu9la");
      formData.append("folder", "X-event");
      const data = await reqCloudinary(formData);
      const photoCloudinary = await data.data.secure_url;
      user.photo = photoCloudinary;

      const response = await registerRequest(user);
      setUser(response);
      if (response){
        setIsRegister(true);
        setIsSendForm(true);
      }

    } catch (error) {
      //console.log(error);
      //console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log(response);    
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{
    signUp,
    signIn,
    user,
    isRegister,
    errors,
    isSendForm
  }}>{children}</AuthContext.Provider>;
};
