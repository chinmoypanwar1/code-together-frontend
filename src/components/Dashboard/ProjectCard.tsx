import { Card, CardHeader, CardFooter, Divider, Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { startProjectAPI } from "../../api/project";
import DeleteProjectModal from "./DeleteProjectModal";

type Props = {
  projectName: string;
  projectId: string;
  languages: string;
};

export default function ProjectCard({ projectName, projectId, languages }: Props) {

  const navigate = useNavigate();

  const handleProject = async () => {
    try {
      const response = await startProjectAPI({ projectId });
      console.log(response);
      navigate(`/playground?projectId=${projectId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">ProjectName: </p>
          <p className="text-md">{projectName}</p>
          <p className="text-small text-default-500">ProjectId: </p>
          <p className="text-small text-default-500">{projectId}</p>
        </div>
      </CardHeader>
      <Divider />
      <Button color="secondary" onClick={handleProject}>
        Enter project!
      </Button>
      <DeleteProjectModal projectName={projectName} projectId={projectId} />
      <CardFooter>
        <div>
          <p>Languages: </p>
          <p>{languages}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

