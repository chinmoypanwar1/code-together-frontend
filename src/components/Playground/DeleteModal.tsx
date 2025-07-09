import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react"
import type { FileListItem } from "../../vite-env";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteYjsItem } from "../../context/yjsSlice";

type DeleteModalType = {
  fileName: string,
  data: FileListItem,
}

function DeleteModal({ fileName, data }: DeleteModalType) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    onOpen();
  }

  const handleDelete = () => {
    dispatch(deleteYjsItem({
      id: data.id,
    }))
    onClose();
  }

  return (
    <>
      <Button onPress={handleOpen}>Delete {data.type}</Button>
      <Modal isOpen={isOpen} size="xs" onClose={onClose}>
        <ModalContent>
          {
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Delete file {fileName}</ModalHeader>
                <ModalBody>
                  <p>
                    Do you really want to delete the file {fileName} ?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>No</Button>
                  <Button color="danger" onPress={handleDelete}>Yes</Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal
