import { Login } from "./components/login/login";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/nav/NavBar.jsx";
import { Home } from "./components/home/Home";
import { AllTrails } from "./components/trails/AllTrails.jsx";
import { MyTrails } from "./components/trails/MyTrails.jsx";
import { CreateTrails } from "./components/trails/CreateTrails.jsx";
import { TrailDetails } from "./components/trails/AllTrailsDetails.jsx";

export const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="take-me-home" element={<Home />} />
        <Route path="my-trails" element={<MyTrails />} />
        <Route path="/all-trails" element={<AllTrails />} />
        <Route path="/all-trails/details/:trailId" element={<TrailDetails />} />
        <Route path="create-trails" element={<CreateTrails />} />
        <Route path="/my-trails" element={<MyTrails />} />
        <Route path="/my-trails/edit/:trailId" element={<CreateTrails />} />
      </Route>
    </Routes>
  );
};
