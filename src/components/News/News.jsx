import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Card, Button, Row, Col } from "react-bootstrap";
import NewsCard from "../NewsCard/NewsCard";

const News = (props) => {
  const { data, isLoading } = useQuery("name", () => {
    return axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=100&apiKey=aef0fb1b65764bd0b638827a204fb60f"
    );
  });
  const [sortBy, setSortBy] = useState(false);
  const [news, setNews] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const per_page = 20;
  const pageCount = Math.ceil(data?.data.articles.length / per_page);

  const offset = currentPage * per_page;
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      axios
        .get(
          "https://newsapi.org/v2/everything?q=" +
            `${input}` +
            "&apiKey=aef0fb1b65764bd0b638827a204fb60f"
        )
        .then((res) => {
          setNews(res.data.articles);
          setInput("");
          setSortBy(true);
        });
    }
  };

  const handleSortBy = () => {};

  useEffect(() => {
    if (isLoading) {
      setNews([]);
    } else {
      setNews(data?.data.articles);
    }
  }, [isLoading]);
  //   console.log(isLoading);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className="wrapper"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alighnItem: "center",
      //   width: "100%",
      // }}
    >
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={input}
          placeholder="search"
        />
        <button>search</button>
      </form>
      {sortBy && (
        <div>
          {" "}
          <label htmlFor="sort-by">Sort By</label>
          <select name="sort-by" id="sort-by" onChange={handleSortBy}>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Published At</option>
          </select>{" "}
        </div>
      )}
      {news.slice(offset, offset + per_page).map((article) => {
        const { title, description, urlToImage } = article;
        return (
          <NewsCard
            key={uuid()}
            title={title}
            description={description}
            urlToImage={urlToImage}
          />

          // <div key={uuid()}>
          //   <img src={urlToImage} alt={title} />
          //   <h5>{title}</h5>
          //   <h6>{description}</h6>
          // </div>
        );
      })}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={5}
        breakLabel="..."
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default News;
