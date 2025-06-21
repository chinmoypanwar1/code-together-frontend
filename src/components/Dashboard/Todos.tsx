import { useAppSelector } from "../../hooks/reduxHooks"
import ProjectTodo from "./ProjectTodos";

function Todos() {
  const projects = useAppSelector(state => state.project.project);
  return (
    <>
      {
        projects.map(project => (
          <ProjectTodo projectId={project.projectId} projectName={project.projectName} todos={project.projectTodos} />
        ))
      }
    </>
  )
}

export default Todos
