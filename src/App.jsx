import { useState, useEffect } from 'react';

import TaskList from './Components/TaskList';
import Profile from './Components/Profile';

import { ButtonT } from './TailwindComponents';

import { dummyTasks, dummyUser, dummyHelloWorld } from './__mock__/data.js';

// API URL
// const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const [message, setMessage] = useState(null);
  const [task, setTask] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchHelloWorld();
    console.log(dummyHelloWorld);
  }, []);

  const fetchHelloWorld = async () => {
    setTimeout(async () => {
      console.log('This will be shown after 3 second');
      await setMessage(dummyHelloWorld.text);
    }, 3000);
  };

  const fetchTaskHandler = () => {
    setTask(dummyTasks.text);
    console.log(task);
  };

  const fetchProfileHandler = () => {
    setUser(dummyUser);
    console.log(user);
  };

  const resetHandler = () => {
    setTask([]);
    setUser(null);
  };

  const headerTitle = message == null ? <h1>Loading...</h1> : <h1>{message}</h1>;

  return (
    <div className="container mx-auto mt-20">
      <header className="flex justify-center pb-5">{headerTitle}</header>
      <ButtonT
        className="hover:!bg-red-600 mx-2"
        size="md"
        variant="secondary"
        onClick={resetHandler}>
        Reset
      </ButtonT>
      <section className="flex flex-wrap pt-5">
        <ButtonT
          className="hover:!bg-blue-600 mx-2"
          size="md"
          variant="primary"
          onClick={fetchProfileHandler}>
          Get Profile
        </ButtonT>
        <ButtonT
          className="hover:!bg-blue-600 mx-2"
          size="md"
          variant="primary"
          onClick={fetchTaskHandler}>
          Get Tasks
        </ButtonT>
      </section>
      <section>{task.length > 0 && <TaskList tasks={task} />}</section>
      <section>{user != null && <Profile user={user} />}</section>
    </div>
  );
}

export default App;
