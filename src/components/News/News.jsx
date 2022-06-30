import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Card, Button, Row, Col } from "react-bootstrap";
import NewsCard from "./NewsCard";
import "./News.css";

const News = (props) => {
  const { data, isLoading, refetch } = useQuery("name", () => {
    return axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=100&apiKey=3775d0dcc02e420aae630ae761863436"
    );
  });
  const [select, setSelect] = useState({ value: "select" });
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

  const topHeadline = () => {
    refetch();
    window.location.reload();
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
            "&apiKey=3775d0dcc02e420aae630ae761863436"
        )
        .then((res) => {
          setNews(res.data.articles);
          localStorage.setItem("input", input);
          setInput("");
          setSortBy(true);
        });
    }
  };

  const handleSortBy = (e) => {
    const input = localStorage.getItem("input");
    setSelect({ value: e.target.value });
    axios
      .get(
        "https://newsapi.org/v2/everything?q=" +
          `${input}` +
          "&sortBy=" +
          `${e.target.value}` +
          "&apiKey=3775d0dcc02e420aae630ae761863436"
      )
      .then((res) => {
        setNews(res.data.articles);
        setInput("");
        setSortBy(true);
      });
  };

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
      className="main"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alighnItem: "center",
      //   width: "100%",
      // }}
    >
      <div className="main__container">
        <div className="main__container--form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={input}
              placeholder="search"
            />
            <button>search</button>
          </form>
          {sortBy && <p onClick={topHeadline}>Top Headline</p>}
          {sortBy && (
            <div>
              <select
                value={select.value}
                name="sort-by"
                id="sort-by"
                onChange={handleSortBy}
              >
                <option value="">Sort By</option>
                <option value="relevancy">Relevancy</option>
                <option value="popularity">Popularity</option>
                <option value="publishedAt">Published At</option>
              </select>{" "}
            </div>
          )}
        </div>
        <div className="main__container--content">
          {news.slice(offset, offset + per_page).map((article) => {
            const {
              title,
              description,
              urlToImage,
              source = {},
              publishedAt,
              content,
              author,
              url,
            } = article;
            const { name } = source;
            return (
              <div key={uuid()}>
                <NewsCard
                  url={url}
                  name={name}
                  content={content}
                  publishedAt={publishedAt}
                  author={author}
                  id={uuid()}
                  title={title}
                  description={description}
                  urlToImage={urlToImage}
                />
              </div>
            );
          })}
        </div>
      </div>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Load More"
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
