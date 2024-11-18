import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addTrail,
  getDifficulties,
  updateTrail,
} from "../../services/trailService";

export const CreateTrails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [difficulties, setDifficulties] = useState([]);

  const [trail, setTrail] = useState({
    name: "",
    distanceMiles: 0,
    location: "",
    details: "",
    difficultyId: 0,
    userId: 0,
  });

  useEffect(() => {
    getDifficulties().then((difficulties) => {
      setDifficulties(difficulties);
    });

    if (location.state?.trail) {
      setTrail(location.state.trail);
    }
  }, [location]);

  const handleSave = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("trail_user"));

    const trailToSave = {
      ...trail,
      userId: user.id,
    };

    if (trail.id) {
      updateTrail(trailToSave).then(() => {
        window.alert("Trail has been updated!");
        navigate("/my-trails");
      });
    } else {
      addTrail(trailToSave).then(() => {
        setTrail({
          name: "",
          distanceMiles: 0,
          location: "",
          details: "",
          difficultyId: 0,
          userId: 0,
        });
        window.alert("Trail has been added!");
      });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSave}>
      <h2>{trail.id ? "Edit Trail" : "Add New Trail"}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Trail Name"
          value={trail.name}
          onChange={(evt) => {
            setTrail({ ...trail, name: evt.target.value });
          }}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="City, ST"
          pattern="^[A-Za-z\s]+,\s*[A-Z]{2}$"
          title="Please enter: City, ST (Example: Nashville, TN)"
          value={trail.location}
          onChange={(evt) => {
            setTrail({ ...trail, location: evt.target.value });
          }}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={trail.distanceMiles}
          onChange={(evt) => {
            setTrail({ ...trail, distanceMiles: parseFloat(evt.target.value) });
          }}
          required
        />
        <span>Miles</span>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Trail Details"
          value={trail.details}
          onChange={(evt) => {
            setTrail({ ...trail, details: evt.target.value });
          }}
          required
        />
      </div>
      <div className="form-group">
        <select
          value={trail.difficultyId}
          onChange={(evt) => {
            setTrail({ ...trail, difficultyId: parseInt(evt.target.value) });
          }}
          required
        >
          <option value="0">Select Difficulty</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <button type="submit">
          {trail.id ? "Update Trail" : "Save Trail"}
        </button>
      </div>
    </form>
  );
};
