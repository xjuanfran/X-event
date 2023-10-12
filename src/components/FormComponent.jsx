import React from "react";
import { useForm } from "react-hook-form";

const FormComponent = ({ fields, onSubmit, showPhotoInput = true }) => {
  const { register, handleSubmit } = useForm();

  const path = window.location.pathname; // Use this for know what page is for example: /register for know how build the form
  console.log(path);

  return (
    <section className="bg-zinc-800 max-w-md p-10 rounded-md my-2">
      <h1>XEvent</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            {...register(field.name, { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
        ))}

        {showPhotoInput && (
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("photo", { required: true })}
          />
        )}

        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
};

export default FormComponent;
