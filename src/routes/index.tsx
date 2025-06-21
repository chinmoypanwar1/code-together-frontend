import { Route, Routes } from "react-router";
import { HomePage, LoginPage, SignupPage, DashboardPage, LoginFailedPage } from "../pages/index"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { setRedirectFunction } from "../utils/redirect";

function AppRouter() {

  const navigate = useNavigate();

  useEffect(() => {
    setRedirectFunction(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login/failed" element={<LoginFailedPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default AppRouter;
