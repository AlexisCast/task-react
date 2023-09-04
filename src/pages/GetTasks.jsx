import { useState, useEffect, useContext } from 'react';

import { ButtonT, PageContent } from '../TailwindComponents';
import useHttps from '../hooks/use-https';
import AuthContext from '../store/auth-context';
import TaskList from '../Components/TaskList';

const baseUrl = import.meta.env.VITE_BASE_URL;
const GetTasksPage = () => {
  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const ctx = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (error == null) {
      return;
    }

    alert(error);
  }, [error]);

  const getTasks = () => {
    const saveTask = (object) => {
      setTasks(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/tasks`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.userData.token}`
        }
      },
      saveTask
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    getTasks();
  };

  const updateHandler = () => {
    setChange(!change);
  };

  return (
    <>
      <PageContent title="Get Tasks">
        {isLoading ? 'Fetching Tasks' : ''}
        <form onSubmit={handleSubmit}>
          <ButtonT type="submit" className="w-full px-4 py-2 hover:!bg-[#a6a6a6]">
            Submit
          </ButtonT>
        </form>
      </PageContent>
      <section className="py-5">
        {tasks.length > 0 && (
          <PageContent title="Get Tasks" className="!max-w-5xl">
            <TaskList change={change} tasks={tasks} updateHandler={updateHandler} />
          </PageContent>
        )}
      </section>
    </>
  );
};

export default GetTasksPage;
