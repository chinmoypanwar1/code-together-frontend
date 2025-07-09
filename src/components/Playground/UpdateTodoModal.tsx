import { Button, useDisclosure, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, Textarea } from "@heroui/react"
import { EditIcon } from "../../assets/icons/EditIcon"
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useState, useEffect } from "react";
import { updateTodo } from "../../context/yjsSlice";

type UpdateTodoModalType = {
  todoTitle: string;
  todoContent: string;
  todoStatus: string;
  todoId: string;
}

function UpdateTodoModal({ todoTitle, todoContent, todoStatus, todoId }: UpdateTodoModalType) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [title, setTitle] = useState<string>(todoTitle);
  const [content, setContent] = useState<string>(todoContent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTitle(todoTitle);
    setContent(todoContent);
  }, [todoTitle, todoContent]);

  const handleUpdateTodo = () => {
    dispatch(updateTodo({
      newTitle: title,
      newContent: content,
      newStatus: todoStatus,
      id: todoId,
    }))
    onClose();
  }

  return (
    <>
      <Button
        isIconOnly
        aria-label="EditTodo"
        onPress={onOpen}
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Todo</ModalHeader>
              <ModalBody>
                <Textarea
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
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleUpdateTodo}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateTodoModal
