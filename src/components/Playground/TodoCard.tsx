import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider } from "@heroui/react"
import { useState } from "react";
import UpdateTodoModal from "./UpdateTodoModal";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteTodo, toggleTodo } from "../../context/yjsSlice";

type TodoCardProps = {
  todoTitle: string;
  todoContent: string;
  todoStatus: 'Pending' | 'Done';
  todoId: string;
}

function TodoCard({ todoTitle, todoContent, todoStatus, todoId }: TodoCardProps) {

  const [isSelected, setIsSelected] = useState<'Pending' | 'Done' | null>(todoStatus)
  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    const newStatus = isSelected === 'Done' ? 'Pending' : 'Done';
    setIsSelected(newStatus);
    dispatch(toggleTodo({
      id: todoId,
    }))
  }

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({
      id: todoId,
    }))
  }

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex flex-row">
          <p>{todoTitle}</p>
          <Checkbox 
            isSelected={isSelected === 'Done' ? true : false} 
            onValueChange={handleCheckboxChange}
          ></Checkbox>
          <UpdateTodoModal
            todoTitle={todoTitle}
            todoContent={todoContent}
            todoStatus={todoStatus}
            todoId={todoId}
          />
        </CardHeader>
        <Divider/>
        <CardBody>
          <p>{todoContent}</p>
        </CardBody>
        <CardFooter>
          <Button
            isIconOnly 
            color="danger" 
            variant="flat"
            onPress={handleDeleteTodo}
          >
            <DeleteIcon />
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default TodoCard
