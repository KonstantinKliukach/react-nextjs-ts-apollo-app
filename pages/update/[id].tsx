import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { withApollo } from '../../lib/apollo';
import { useTaskQuery } from '../../generated/graphql';
import UpdateTaskForm from '../../components/UpdateTaskForm';

const UpdatePage: NextPage = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? parseInt(router.query.id, 10) : NaN;
  const { loading, data, error } = useTaskQuery({
    variables: {
      id,
    },
  });
  const task = data?.task;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className={'alert-error'}>Task not fount...</p>;
  return (
    <>{task && <UpdateTaskForm initialTask={{ title: task.title }} id={task.id}/>}</>
  );
};
export default withApollo(UpdatePage);
