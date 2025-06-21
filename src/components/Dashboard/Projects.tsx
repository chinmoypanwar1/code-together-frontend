import { useAppSelector } from "../../hooks/reduxHooks"
import ProjectCard from "./ProjectCard"

function Projects() {

  const projects = useAppSelector(state => state.project.project);

  if (!projects) {
    return (
      <p>No projects loaded till now.</p>
    )
  }

  if (!Array.isArray(projects)) {
    return <p>Projects data is not available.</p>;
  }

  return (
    <div>
      {
        projects.map(project => (
          <ProjectCard key={project.projectId} projectName={project.projectName} projectId={project.projectId} languages={project.languages} />
        ))
      }
    </div>
  )
}

export default Projects
