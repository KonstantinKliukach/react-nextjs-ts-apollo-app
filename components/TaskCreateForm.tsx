import React, { useState } from 'react';

const TaskCreateForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <form>
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
