import React from "react";
// import "./newsCard.scss";
import { Link, useNavigate } from "react-router-dom";

const NewsCard = ({
  title,
  description,
  urlToImage,
  id,
  name,
  content,
  publishedAt,
  author,
  url,
}) => {
  const navigate = useNavigate();

  const handleOnClick = (
    name,
    title,
    description,
    urlToImage,
    author,
    content,
    publishedAt,
    url
  ) => {
    navigate(`/article/${id}`);
    localStorage.setItem(
      "news",
      JSON.stringify({
        name,
        title,
        description,
        urlToImage,
        author,
        content,
        publishedAt,
        url,
      })
    );
  };

  return (
    <div className="card">
      <img src={urlToImage} className="card__img" />
      <div className="card__body">
        <h3 className="news__title">{title}</h3>
        <p className="card__description">{description}</p>
        <p
          className="card__button"
          onClick={() =>
            handleOnClick(
              name,
              title,
              description,
              urlToImage,
              author,
              content,
              publishedAt,
              url
            )
          }
        >
          Read More
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
