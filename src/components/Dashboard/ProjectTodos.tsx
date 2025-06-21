import { Card, CardHeader, CardBody, Divider, Switch } from "@heroui/react";

type Todo = {
  todoId: string,
  title: string,
  content: string,
  status: string,
}

type Project = {
  projectName: string,
  projectId: string,
  todos: Todo[],
}

export default function ProjectTodo({ projectName, projectId, todos}: Project) {
  return (
    <Card id={projectId} className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{projectName}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {todos.map(todo => (
          <Switch>
            {todo.content}
          </Switch>
        ))}
      </CardBody>
      <Divider />
    </Card>
  );
}

