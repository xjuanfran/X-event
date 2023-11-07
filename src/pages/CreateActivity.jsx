import CardForm from "../components/CardForm";

const CreateActivity = () => {
  const fields = [
    { type: "text", name: "name", placeholder: "Nombre de la actividad" },
    { type: "number", name: "cost", placeholder: "Precio de la actividad" },
  ];
  const buttonName = "Crear actividad";
  return(
    <CardForm 
    fields={fields} 
    fieldArea 
    showImage={false}
    showActivity={true}
    buttonName={buttonName} />
  ) 
};

export default CreateActivity;
