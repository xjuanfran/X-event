import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cardForm.css';

const CardForm = ({ fields }) => {

  return (
    <Link to="#" className="link-card">
      <div className="card animate__animated animate__fadeInUp">
        <div className="overflow">
          <img src={""} alt="..." className="card-img-top" />
        </div>
        <div className="card-body">
          <h4 className="card-title">{""}</h4>
          <p className="card-text">{"description"}</p>
          <p className="card-text">${"price"}</p>
        </div>
      </div>
    </Link>
  );
};


export default CardForm;