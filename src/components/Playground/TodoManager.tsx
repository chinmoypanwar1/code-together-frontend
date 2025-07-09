import { useAppSelector } from "../../hooks/reduxHooks";
import CreateTodoModal from "./CreateTodoModal";
import TodoCard from "./TodoCard";

function TodoManager() {

  const todos = useAppSelector(state => state.playground.todos);

  return (
    <>
      <div className="flex flex-col">
        <CreateTodoModal />
        { todos && todos.length>0 && todos?.map(todo => (
          <>
            <TodoCard
              key={todo.id}
              todoTitle={todo.title}
              todoContent={todo.content}
              todoId={todo.id}
              todoStatus={todo.status}
            />
          </>
        ))}
      </div>
    </>
  )
}

export default TodoManager
