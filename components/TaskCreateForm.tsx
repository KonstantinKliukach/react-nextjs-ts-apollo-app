import React, { useState } from 'react';
import { useCreateTaskMutation } from '../generated/graphql';

interface TaskCreateForm {
  onTaskCreated: () => void;
}

const TaskCreateForm: React.FC<TaskCreateForm> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState<string>('');
  const [createTask, { loading, error }] = useCreateTaskMutation({
    onCompleted: () => {
      onTaskCreated();
      setTitle('');
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading && title) {
      createTask({
        variables: {
          input: {
            title,
          },
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      { error && <p className={'alert-error'}>An error occurred</p>}
      <input
        autoComplete={'off'}
        type='text'
        name='title'
        value={title}
        onChange={handleChange}
        placeholder={'What would you like to do'}
        className={'text-input new-task-text-input'}
      />
    </form>
  );
};

export default TaskCreateForm;
