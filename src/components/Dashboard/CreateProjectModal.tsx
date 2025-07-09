import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Listbox,
  ListboxItem,
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { createProject as createProjectAPI, getAllImages } from "../../api/project";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createProject } from "../../context/projectSlice";

export default function CreateProjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [images, setImages] = useState({});
  const [error, setError] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [selectedImageId, setSelectedImageId] = useState(new Set([""]));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllImageDetails = async () => {
      try {
        const res = await getAllImages();
        setImages(res.data);
      } catch (error) {
        setError(error);
      }
    }
    getAllImageDetails();
  }, [])

  const handleOpen = () => {
    onOpen()
  };


  const handleSubmit = async () => {

    if (!projectName || ![...selectedImageId][0]) {
      setError({
        data: [],
        message: 'Please fill out all the fields',
        success: 'Failure',
      })
      return;
    }

    const payload = {
      project_name: projectName,
      dockerImage_id: [...selectedImageId][0],
    };

    try {
      const res = await createProjectAPI(payload);
      const data = res.data;
      console.log(res.data);
      const transformed = {
        projectId: data.project_id,
        projectName: data.name,
        languages: data.dockerImage.languages || "",
        projectTodos: data.project_todos.map((todo: any) => ({
          todoId: todo.todo_id || "",
          title: todo.title || "",
          content: todo.content || "",
          status: todo.status || ""
        }))
      };
      console.log('Works till here');
      dispatch(createProject(transformed));
      console.log('Works till here as well.');
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }

    onClose(); // Close modal after submit
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onPress={() => handleOpen()}>
          Create Project
        </Button>
      </div>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Project</ModalHeader>
              <ModalBody>
                <Listbox
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={selectedImageId}
                  variant="flat"
                  onSelectionChange={setSelectedImageId}
                  aria-label="Please select an image:"
                >
                  {
                    images.map(image => (
                      <ListboxItem
                        key={image.dockerImage_id}
                        description={`Name: ${image.displayName}, ID: ${image.dockerImage_id}`}
                        textValue={image.dockerImage_id}
                      >
                        The name of the image is : {image.displayName}
                      </ListboxItem>
                    ))
                  }
                </Listbox>
                <Input
                  isRequired
                  className="max-w-xs"
                  value={projectName}
                  label="Name of your project:"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
