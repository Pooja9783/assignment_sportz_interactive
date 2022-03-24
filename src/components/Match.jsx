import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");

const Match = () => {
  const [val, setVal] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((res) => {
        console.log(res.data.playerList);
        setVal(res.data.playerList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="container-fluid p-3 mb-2 bg-primary text-white">
        <div className="container">
          <div className="row row justify-content-md-center">
            {val.map((value, i) => {
              return (
                <div className="col-sm-6 col-md-6 col-lg-3" key={i}>
                  <div
                    className="card p-3  mb-5"
                    style={{ width: "18rem", height: "33rem" }}
                  >
                    <img src={`./player-images/${value.Id}.jpg`} alt="img" />
                    <div className="card-body">
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
