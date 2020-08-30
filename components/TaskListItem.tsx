import React, { useEffect } from 'react';
import Link from 'next/link';
import { Task, useDeleteTaskMutation, TasksQuery, TasksQueryVariables, TasksDocument, TaskStatus } from '../generated/graphql';

interface TaskListItem {
  task: Task
}

const TaskListItem: React.FC<TaskListItem> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    update: (cache, result) => {
      const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status: TaskStatus.Active },
      });
      cache.writeQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status: TaskStatus.Active },
        data: {
          tasks: data.tasks.filter(({ id }) => id !== result.data.deleteTask.id),
        },
      });
    },
  });
  const handleDelete = () => {
    deleteTask({
      variables: {
        id: task.id,
      },
    });
  };
  useEffect(() => {
    if (error) {
      alert('An error occured');
    }
  }, [error]);
  return (
    <li className="task-list-item" key={task.id}>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        disabled={loading}
        onClick={handleDelete}
        className="task-list-item-delete"
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;
