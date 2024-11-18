import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTrails, deleteTrail } from "../../services/trailService";
import "./Trails.css";

export const MyTrails = () => {
  const [trails, setTrails] = useState([]);
  const navigate = useNavigate();

  const getAndSetTrails = () => {
    const localUser = JSON.parse(localStorage.getItem("trail_user"));
    getMyTrails(localUser.id).then((trailArray) => {
      setTrails(trailArray);
    });
  };

  useEffect(() => {
    getAndSetTrails();
  }, []);

  const handleDelete = (trailId) => {
    if (window.confirm("Are you sure you want to delete this trail?")) {
      deleteTrail(trailId).then(() => {
        getAndSetTrails();
      });
    }
  };

  return (
    <>
      <h2>My Trails</h2>
      <div className="trails">
        {trails.map((trailObj) => (
          <div className="trail-card" key={trailObj.id}>
            <h3>{trailObj.name}</h3>
            <p className="trail-details">{trailObj.distanceMiles} Miles</p>
            <p className="trail-details">{trailObj.location}</p>
            <p className="trail-details">{trailObj.details}</p>
            <p className="trail-details">
              Difficulty: {trailObj.difficulty?.name}
            </p>
            <div className="button-container">
              <button
                onClick={() =>
                  navigate(`/my-trails/edit/${trailObj.id}`, {
                    state: { trail: trailObj },
                  })
                }
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trailObj.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
