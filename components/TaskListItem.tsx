import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import { Task, useDeleteTaskMutation, TasksQuery, TasksQueryVariables, TasksDocument, TaskStatus, useChangeTaskStatusMutation } from '../generated/graphql';
import { TaskFilterContext } from '../pages/[status]';

interface TaskListItem {
  task: Task;
}

const TaskListItem: React.FC<TaskListItem> = ({ task }) => {
  const { status } = useContext(TaskFilterContext);
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    update: (cache, result) => {
      const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status },
      });
      cache.writeQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status },
        data: {
          tasks: data.tasks.filter(({ id }) => id !== result.data.deleteTask.id),
        },
      });
    },
  });
  const [changeStatus, { loading: changingStatus, error: changingStatusError }] = useChangeTaskStatusMutation();
  const handleDelete = () => {
    deleteTask({
      variables: {
        id: task.id,
      },
    });
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStatus = task.status === TaskStatus.Active
      ? TaskStatus.Completed
      : TaskStatus.Active;
    changeStatus({
      variables: {
        id: task.id,
        status: nextStatus,
      },
    });
  };
  useEffect(() => {
    if (error) {
      alert('An error occured');
    }
  }, [error]);
  useEffect(() => {
    if (changingStatusError) {
      alert('Cant change status!');
    }
  }, [changingStatusError]);
  return (
    <li className="task-list-item" key={task.id}>
      <label className='checkbox'>
        <input
          type='checkbox'
          onChange={handleStatusChange}
          checked={task.status === TaskStatus.Completed}
          disabled={changingStatus}
        />
        <span className='checkbox-mark'>&#10003;</span>
      </label>
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
