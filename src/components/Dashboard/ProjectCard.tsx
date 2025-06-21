import { Card, CardHeader, CardFooter, Divider, Button } from "@heroui/react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteProjectAPI } from "../../api/project";
import { deleteProject } from "../../context/projectSlice";

type Props = {
  projectName: string;
  projectId: string;
  languages: string;
};

export default function ProjectCard({ projectName, projectId, languages } : Props) {

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await deleteProjectAPI({projectId});
      dispatch(deleteProject({projectId}));
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
      <Button color="danger" onClick={handleDelete}>
        Delete project!
      </Button>
      <CardFooter>
        <div>
          <p>Languages: </p>
          <p>{languages}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

