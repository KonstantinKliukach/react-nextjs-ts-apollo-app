import React from 'react';
import Link from 'next/link';
import { Task, TaskStatus } from '../generated/graphql';
import TaskListItem from './TaskListItem';

interface Tasks {
  tasks: Task[];
}

const TasksList: React.FC<Tasks> = ({ tasks }) => (
  <ul className={'task-list'}>
    {
      tasks.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ))
    }
  </ul>
);

export default TasksList;
