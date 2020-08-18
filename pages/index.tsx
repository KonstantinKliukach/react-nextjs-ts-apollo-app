import React from 'react';

import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';

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
      <ul>
        {
          tasks.map((task) => <li key={task.id}>{task.title}</li>)
        }
      </ul>
    )
    : null;
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
