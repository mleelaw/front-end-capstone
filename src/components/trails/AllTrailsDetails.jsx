import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrailById } from "../../services/trailService";
import "./Trails.css";
export const TrailDetails = () => {
  const [trail, setTrail] = useState({});
  const { trailId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTrailById(trailId).then((trailData) => {
      setTrail(trailData);
    });
  }, [trailId]);

  return (
    <div className="trail-details-container">
      <button onClick={() => navigate("/all-trails")}>
        Back to All Trails
      </button>
      <h2>{trail.name}</h2>
      <div className="trail-details">
        <p>{trail.distanceMiles} Miles</p>
        <p>{trail.location}</p>
        <p>{trail.details}</p>
        <p>Difficulty: {trail.difficulty?.name}</p>
      </div>
    </div>
  );
};
