import React from 'react';

import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';
import TasksList from '../components/TasksList';
import TaskCreateForm from '../components/TaskCreateForm';

interface InitialProps {}

type Props = InitialProps

const IndexPage: NextPage<Props, InitialProps> = () => {
  const { loading, error, data } = useTasksQuery({
    variables: {
      status: TaskStatus.Active,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const tasks = data?.tasks;
  return tasks
    ? (
      <>
        <TaskCreateForm />
        <TasksList tasks={tasks} />
      </>
    )
    : null;
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
