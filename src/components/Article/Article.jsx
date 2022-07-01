import React from "react";

import "./Article.scss";

const Article = () => {
  const news = localStorage.getItem("news");
  const newsObj = JSON.parse(news);

  const {
    name,
    title,
    description,
    urlToImage,
    author,
    content,
    publishedAt,
    url,
  } = newsObj;

  return (
    <div className="container">
      <img src={urlToImage} alt={name} className="card__img" />
      <div className="card__body">
        <h3 className="newss__title">title: {title}</h3>
        <h3 className="news__author">author: {author}</h3>
        <h3 className="news__name">name: {name}</h3>
        <h3 className="news__date">publishedAt: {publishedAt}</h3>
        <h3 className="news__desc">description: {description}</h3>
        <p>content: {content}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__button"
        >
          READ FULL ARTICLE
        </a>
      </div>
    </div>
  );
};

export default Article;
