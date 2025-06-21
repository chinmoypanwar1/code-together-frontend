import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { useEffect } from "react";
import { getUserDetails, getUserProjectsDetails } from "../api/user";
import { logoutUser, setUser } from "../context/userSlice";
import { Button } from "@heroui/react";
import UserDetails from "../components/Dashboard/UserDetails";
import { setAllProjects } from "../context/projectSlice";
import Projects from "../components/Dashboard/Projects";
import CreateProjectModal from "../components/Dashboard/CreateProjectModal";

function DashboardPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetails();
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(logoutUser());
      }
    }

    const fetchUserProjects = async () => {
      try {
        const res = await getUserProjectsDetails();
        const transformed = res.data.map((project) => ({
          projectId: project.project_id,
          projectName: project.name,
          languages: project.dockerImage.languages || "",
          projectTodos: project.project_todos.map((todo: any) => ({
            todoId: todo.todo_id || "",
            title: todo.title || "",
            content: todo.content || "",
            status: todo.status || ""
          }))
        }));
        dispatch(setAllProjects(transformed));
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserDetails();
    fetchUserProjects();
  }, [dispatch, navigate])

  if (!user.isAuthenticated) {
    return (
      <div>
        <Button color="primary">
          <NavLink to={"/login"}>
            Return back to login page.
          </NavLink>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>Welcome to the dashboard.</h1>
        <UserDetails />
        <Projects />
        <CreateProjectModal />
      </div>
    </>
  )
}

export default DashboardPage
