import React from "react";

import "./ArticleCard";

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
    <div>
      <img src={urlToImage} alt={name} />

      <h1>title: {title}</h1>
      <h1>author: {author}</h1>
      <h1>name: {name}</h1>
      <h1>publishedAt: {publishedAt}</h1>
      <h1>description: {description}</h1>
      <h1>content: {content}</h1>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {/* Read Full Article */}
        READ FULL ARTICLE
      </a>
    </div>
  );
};

export default Article;
