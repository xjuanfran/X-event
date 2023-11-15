import CardForm from "../components/CardForm";

const CreateActivity = () => {
  const fields = [
    { type: "number", name: "cost", placeholder: "Precio de la actividad" },
  ];
  const buttonName = "Crear actividad";
  return(
    <CardForm 
    fields={fields} 
    fieldArea
    showComboBox={true} 
    showImage={false}
    showActivity={true}
    buttonName={buttonName} />
  ) 
};

export default CreateActivity;
