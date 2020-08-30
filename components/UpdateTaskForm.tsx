import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUpdateTaskMutation } from '../generated/graphql';

interface Task {
  title: string;
}

interface UpdateTaskForm {
  initialTask: Task,
  id: number,
}

const UpdateTaskForm: React.FC<UpdateTaskForm> = ({ initialTask, id }) => {
  const [task, setTask] = useState<Task>(initialTask);
  const [updateTask, { loading, error, data }] = useUpdateTaskMutation();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask({
      variables: {
        input: {
          ...task,
          id,
        },
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((state) => ({
      ...state,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (data && data.updateTask) {
      router.push('/');
    }
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      {
        error && <p>An error occured...</p>
      }
      <p>
        <label className={'field-label'}>Title</label>
        <input onChange={handleChange} type='text' name='title' className='text-input' value={task.title} />
      </p>
      <p>
        <button disabled={loading} type='submit' className='button'>
          {loading ? 'Loading' : 'Save'}
        </button>
      </p>
    </form>
  );
};

export default UpdateTaskForm;
