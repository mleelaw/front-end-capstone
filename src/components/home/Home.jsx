import image from "../../pictures/image.png";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="page-greeting">Welcome!</div>
      <img className="map" src={image} alt="Pinned Map" />
    </div>
  );
};
