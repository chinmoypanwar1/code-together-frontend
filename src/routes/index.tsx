import { Route, Routes, useLocation } from "react-router";
import { HomePage, LoginPage, SignupPage, DashboardPage, LoginFailedPage } from "../pages/index"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { setRedirectFunction } from "../utils/redirect";
import PlaygroundPage from "../pages/PlaygroundPage";
import { useAppDispatch } from "../hooks/reduxHooks";
import { disconnectRoom } from "../context/socketSlice";

function AppRouter() {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const whitelist = ["/playground"];
    const shouldDisconnect = !whitelist.some((path) => 
      location.pathname.startsWith(path)
    )
    if(shouldDisconnect) {
      dispatch(disconnectRoom());
    }
    setRedirectFunction(navigate);
  }, [navigate, location, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login/failed" element={<LoginFailedPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/playground" element={<PlaygroundPage/>} />
    </Routes>
  )
}

export default AppRouter;
