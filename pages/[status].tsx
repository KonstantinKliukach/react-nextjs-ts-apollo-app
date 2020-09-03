import React, { createContext } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { withApollo } from '../lib/apollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';
import TasksList from '../components/TasksList';
import TaskCreateForm from '../components/TaskCreateForm';
import TaskFilter from '../components/TaskFilter';

interface InitialProps {
  ssr: boolean
}

type Props = InitialProps

interface TaskFilterContextValue {
  status?: TaskStatus
}

export const TaskFilterContext = createContext<TaskFilterContextValue>({});

const IndexPage: NextPage<Props, InitialProps> = ({ ssr }) => {
  const router = useRouter();
  const status = typeof router.query.status === 'string' ? router.query.status as TaskStatus : undefined;
  const { loading, error, data, refetch } = useTasksQuery({
    variables: {
      status,
    },
    fetchPolicy: ssr ? 'cache-first' : 'cache-and-network',
  });
  const tasks = data?.tasks;
  if (loading && !tasks) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return tasks
    ? (
      <TaskFilterContext.Provider value={{ status }}>
        <TaskFilter />
        <TaskCreateForm onTaskCreated={refetch} />
        <TasksList tasks={tasks}/>
      </TaskFilterContext.Provider>
    )
    : null;
};

IndexPage.getInitialProps = async (ctx) => ({
  ssr: !!ctx.req,
});

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
