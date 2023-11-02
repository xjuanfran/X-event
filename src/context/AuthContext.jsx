import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, reqCloudinary } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isSendForm, setIsSendForm] = useState(false);
  const [resetErrors, setResetErrors] = useState(0);

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
        if (response) {
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
      if (response) {
        setIsRegister(true);
        setIsSendForm(true);
      }
    } catch (error) {
      //console.log(error);
      //Check if the array of errors is not empty o undefined (error of the type of the data)
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
        const errorUser = error.response.data.errors[0].message;
        setResetErrors((prev) => prev + 1);
        setErrors(errorUser);
      }
      //For errors of the server
      else if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
        setResetErrors((prev) => prev + 1);
        setErrors(error.response.data.message);
      }
    }
  };

  const signIn = async (user) => {
    try {
      const response = await loginRequest(user);
      setUser(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      //If the user repeat error, increment the state resetErrors for show the error again
      setResetErrors((prev) => prev + 1);
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        user,
        isRegister,
        errors,
        isSendForm,
        resetErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
