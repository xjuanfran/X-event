import React from 'react'
import CardComponent from '../components/CardForm'

const Events = () => {
  const fields = [
    { type: "text", name: "name", placeholder: "Nombre evento" },
    { type: "text", name: "type", placeholder: "Tipo de evento" },
  ];

  const buttonName = 'Crear evento'

  return (
    <CardComponent
      fields={fields}
      fieldArea
      buttonName={buttonName}
    />
  )
}

export default Events