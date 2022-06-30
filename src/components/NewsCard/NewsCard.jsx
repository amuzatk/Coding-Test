import React from "react";
// import "./NewsCard.scss";
import { Link } from "react-router-dom";

const NewsCard = ({ title, description, urlToImage }) => {
  return (
    <div className="card">
      <img src={urlToImage} className="card__img" />
      <div className="card__body">
        <h2 className="news__title">{title}</h2>
        <p className="card__description">{description}</p>
        <button className="card__button"></button>
        {/* <Link to={`/${item.id}`} target="_blank" className="card__button">
          Read More
        </Link> */}
      </div>
    </div>
  );
};

export default NewsCard;
