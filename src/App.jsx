import { useState, useEffect } from 'react';

import TaskList from './Components/TaskList';
import Profile from './Components/Profile';

import { ButtonT } from './TailwindComponents';

// import { dummyTasks, dummyUser, dummyHelloWorld } from './__mock__/data.js';

// API URL
const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const [message, setMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHelloWorld();
  }, []);

  useEffect(() => {
    if (error == null) {
      return;
    }
    alert(error);
  }, [error]);

  const fetchHelloWorld = async () => {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(await response);
        throw new Error(
          await `
          Message: ${errorMessage.error}
          Status: ${response.status}
          URL: ${response.url}`
        );
      }
      const data = await response.json();
      setMessage(data.text);
    } catch (error) {
      setMessage('There was an error please reload...');
      setError(error);
    }
  };

  const fetchTaskHandler = async () => {
    setError(null);
    // Replace with your actual Bearer token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVkMmQ1ODRmZTM5NjY4YWMxZTAxOWIiLCJpYXQiOjE2OTM1MTQ1MTZ9.wmbqDr6Fwr-rybAsKgAgkZsjuLJEonGfVpZILrjyAPw';

    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(await response);
        throw new Error(
          await `
          Message: ${errorMessage.error}
          Status: ${response.status}
          URL: ${response.url}`
        );
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchProfileHandler = async () => {
    setError(null);
    // Replace with your actual Bearer token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVkMmQ1ODRmZTM5NjY4YWMxZTAxOWIiLCJpYXQiOjE2OTM1MTQ1MTZ9.wmbqDr6Fwr-rybAsKgAgkZsjuLJEonGfVpZILrjyAPw';

    try {
      const response = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(await response);
        throw new Error(
          await `
          Message: ${errorMessage.error}
          Status: ${response.status}
          URL: ${response.url}`
        );
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      setError(error);
    }
  };

  const resetHandler = () => {
    setTasks([]);
    setUser(null);
  };

  const headerTitle = message == null ? <h1>Loading...</h1> : <h1>{message}</h1>;

  return (
    <div className="container mx-auto mt-20">
      <header className="flex justify-center py-5">{headerTitle}</header>
      <ButtonT
        className="hover:!bg-red-600 mx-2"
        size="md"
        variant="secondary"
        onClick={resetHandler}>
        Reset
      </ButtonT>
      <section className="flex flex-wrap py-5">
        <ButtonT
          className="!bg-[#00cc66] hover:!bg-[#008040] mx-2"
          size="md"
          variant="primary"
          onClick={fetchProfileHandler}>
          Get Profile
        </ButtonT>
        <ButtonT
          className="!bg-[#00cc66] hover:!bg-[#008040] mx-2"
          size="md"
          variant="primary"
          onClick={fetchTaskHandler}>
          Get Tasks
        </ButtonT>
      </section>
      <section className='py-5"'>
        {user != null && (
          <div>
            <h1>Profile</h1>
            <Profile user={user} />
          </div>
        )}
      </section>
      <section className='py-5"'>
        {tasks.length > 0 && (
          <div>
            <h1>Tasks</h1>
            <TaskList tasks={tasks} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
