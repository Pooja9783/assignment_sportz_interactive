import React from "react";
import { useState, useEffect } from "react";
import Match from "./Match";

const axios = require("axios");

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((res) => {
        console.log(res.data.teamsList);
        setData(res.data.playerList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput.length !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <div className="container-fluid p-3 mb-2 bg-primary text-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Players...."
                aria-label="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </form>
            {searchInput.length > 1 ? (
              filteredResults.map((value, i) => {
                return (
                  <div className="col-sm-6 col-md-6 col-lg-2 p-3 mb-2 " key={i}>
                    <div className="card p-3  mb-5 " style={{ width: "30rem" }}>
                      <img src={`./player-images/${value.Id}.jpg`} alt="img" />
                      <div className="card-body ">
                        <h2 className="text-dark fs-5"> {value.PFName}</h2>
                        <p className="text-dark fw-normal ">
                          <span className="fw-bold">Skill : </span>
                          {value.SkillDesc}
                        </p>
                        <p className="text-dark fw-normal ">
                          <span className="fw-bold">value : </span> $
                          {[].slice.call(value.Value).sort(function (a, b) {
                            return b - a;
                          })}
                        </p>
                        <p className="text-dark fw-normal ">
                          <span className="fw-bold">Upcoming Match : </span>
                          {value.UpComingMatchesList[0].CCode}
                          <span className="fw-light"> vs </span>
                          {value.UpComingMatchesList[0].VsCCode}
                        </p>
                        <p className="text-dark fw-normal ">
                          <span className="fw-bold">Date : </span>
                          {value.UpComingMatchesList[0].MDate}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Match />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
