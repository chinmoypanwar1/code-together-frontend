import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { useEffect, useState } from "react";
import { getUserDetails } from "../api/user";
import { logoutUser, setUser } from "../context/userslice";
import { Button } from "@heroui/react";

function DashboardPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetails();
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(logoutUser());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [dispatch, navigate])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <>
      <div>
        <h1>Welcome to the dashboard.</h1>
        <h2>Hello there {user?.username || "User"}</h2>
        <Button color="primary">
          <NavLink to={"/projects"}>
            <h1>Take me to the projects!</h1>
          </NavLink>
        </Button>
      </div>
    </>
  )
}

export default DashboardPage
