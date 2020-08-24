import React from 'react';
import { Task } from '../generated/graphql';

interface Tasks {
  tasks: Task[];
}

const TasksList: React.FC<Tasks> = ({ tasks }) => (
  <ul className={'task-list'}>
    {
      tasks.map((task) => <li className={'task-list-item'} key={task.id}>{task.title}</li>)
    }
  </ul>
);

export default TasksList;
