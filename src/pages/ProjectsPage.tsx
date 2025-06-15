import { useAppSelector } from "../hooks/reduxHooks"

function ProjectsPage() {
  const user = useAppSelector((state) => state.user);
  return (
    <div>
      <h1>This is the projects page.</h1>
      <h2>{user.profilePictureUrl}</h2>
    </div>
  )
}

export default ProjectsPage
