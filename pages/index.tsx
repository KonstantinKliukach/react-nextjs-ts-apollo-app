import React from 'react';

import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { withApollo } from '../lib/apollo';

const tasksQuery = gql`
  query Tasks($status: TaskStatus) {
    tasks(status: $status) {
      id
      title
      status
    }
  }
`;

interface InitialProps {}

type Props = InitialProps

interface TasksQuery {
  tasks: {
    id: number
    title: string
    status: string
  }[]
}

interface TasksQueryVariabled {
  status: string
}

const IndexPage: NextPage<Props, InitialProps> = () => {
  const { loading, error, data } = useQuery<TasksQuery, TasksQueryVariabled>(tasksQuery, {
    variables: {
      status: 'active',
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
