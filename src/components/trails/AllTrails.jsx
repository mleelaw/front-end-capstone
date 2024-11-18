import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrails } from "../../services/trailService";
import "./Trails.css";

export const AllTrails = () => {
  const [trails, setTrails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTrails().then((trailArray) => {
      setTrails(trailArray);
    });
  }, []);

  return (
    <div className="trails">
      {trails.map((trailObj) => (
        <div
          className="trail-card"
          key={trailObj.id}
          onClick={() => {
            navigate(`/all-trails/details/${trailObj.id}`);
          }}
        >
          <h3>{trailObj.name}</h3>
          <p className="trail-details">{trailObj.location}</p>
        </div>
      ))}
    </div>
  );
};
