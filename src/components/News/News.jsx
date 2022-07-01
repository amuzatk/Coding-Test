import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Card, Button, Row, Col } from "react-bootstrap";
import NewsCard from "./NewsCard";
import "./News.scss";

const News = (props) => {
  const { data, isLoading, refetch } = useQuery("name", () => {
    return axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=100&apiKey=aef0fb1b65764bd0b638827a204fb60f"
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
            "&apiKey=aef0fb1b65764bd0b638827a204fb60f"
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
          "&apiKey=aef0fb1b65764bd0b638827a204fb60f"
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="main">
      <h1>Headline News</h1>
      <div className="main__container">
        <div className="main__container--form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={input}
              placeholder="search..."
            />
            <button>search</button>
          </form>
          {sortBy && <p onClick={topHeadline}>Back to Top Headline</p>}
          {sortBy && (
            <div className="sort">
              <select
                className="selection"
                value={select.value}
                name="sort-by"
                id="sort-by"
                onChange={handleSortBy}
              >
                <option className="default" value="">
                  Sort By:
                </option>
                <option className="sorter-1" value="relevancy">
                  Relevancy
                </option>
                <option className="sorter-2" value="popularity">
                  Popularity
                </option>
                <option className="sorter-3" value="publishedAt">
                  Published At
                </option>
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
              <NewsCard
                key={uuid()}
                className="news--card"
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
            );
          })}
        </div>
      </div>

      <ReactPaginate
        className="footer"
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
