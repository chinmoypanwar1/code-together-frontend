import { Button, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, useDisclosure, Input, Textarea } from "@heroui/react"
import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addTodo } from "../../context/yjsSlice";

function CreateTodoModal() {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleCreateTodo = () => {
    dispatch(addTodo({
      title: title,
      content: content,
      status: "Pending",
    }))
    onClose();
  }

  return (
    <>
      <Button onPress={onOpen}>Create Todo </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Todo</ModalHeader>
              <ModalBody>
                <Input
                  label="Title : "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label="Content : "
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleCreateTodo}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTodoModal;
