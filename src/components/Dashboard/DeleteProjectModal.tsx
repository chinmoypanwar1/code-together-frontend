import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react"
import { deleteProjectAPI } from "../../api/project";
import { deleteProject } from "../../context/projectSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useState } from "react";

type DeleteProjectModalType = {
  projectName: string;
  projectId: string;
}

function DeleteProjectModal({ projectName, projectId }: DeleteProjectModalType) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleDeleteProject = async () => {
    try {
      setDeleting(true);
      await deleteProjectAPI({ projectId });
      dispatch(deleteProject({ projectId }));
      setDeleting(false);
      onClose();
    } catch (error) {
      console.log(error);
      setDeleting(true);
      setServerError(error.message);
    }
  }

  return (
    <>
      <Button color="danger" onPress={onOpen}>Delete Project</Button>
      <Modal isOpen={isOpen} onOpenChange={(open) => {
        if (!deleting) onOpenChange(open);
      }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Project </ModalHeader>
              <ModalBody>
                <p>Do you really want to delete the project {projectName} ?</p>
                {serverError && <p>{serverError}</p>}
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={deleting} color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>

                <Button isLoading={deleting} color="danger" onPress={handleDeleteProject}>
                  {deleting ? 'Deleting' : 'Delete Project'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteProjectModal
