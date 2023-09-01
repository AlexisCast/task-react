import { useState, useRef, useEffect } from 'react';

import TaskList from './Components/TaskList';
import Profile from './Components/Profile';

import { ButtonT } from './TailwindComponents';

// import { dummyTasks, dummyUser, dummyHelloWorld } from './__mock__/data.js';

// API URL
const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const defaultJson = `{
    "name": "John",
    "age": 30,
    "password": "1234567890",
    "email": "John@mail.com"
  }`;

  const [message, setMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [newTask, setNewTask] = useState(null);

  const [inputValue, setInputValue] = useState(defaultJson);
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    fetchHelloWorld();
  }, []);

  useEffect(() => {
    setJsonData('');
  }, [inputValue]);

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

    const storedData = sessionStorage.getItem('userData');
    const userData = JSON.parse(storedData);

    const token = userData.token;

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

    const storedData = sessionStorage.getItem('userData');
    const userData = JSON.parse(storedData);

    const token = userData.token;

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

  const addUserHandler = async () => {
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          await `
          Message: ${errorMessage.error || 'Error on Creating User'}
          Status: ${response.status}
          URL: ${response.url}`
        );
      }
      const data = await response.json();
      console.log(data);
      setNewUser(data);
      sessionStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      setError(error);
    }
  };

  const addTaskHandler = async () => {
    setError(null);

    const storedData = sessionStorage.getItem('userData');
    const userData = JSON.parse(storedData);

    const token = userData.token;

    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: jsonData
      });
      console.log(await response);
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          await `
          Message: ${errorMessage.error || 'Error on Creating User'}
          Status: ${response.status}
          URL: ${response.url}`
        );
      }
      const data = await response.json();
      console.log(data);
      setNewTask(data);
    } catch (error) {
      setError(error);
    }
  };

  const resetHandler = () => {
    setTasks([]);
    setUser(null);
    setNewUser(null);
    setNewTask(null);
    setInputValue(defaultJson);
    setJsonData('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConvertToJson = () => {
    try {
      const parsedData = JSON.parse(inputValue);
      setJsonData(JSON.stringify(parsedData, null, 2)); // Adding 2-space indentation for formatting
      console.log(JSON.parse(JSON.stringify(parsedData, null, 2)));
    } catch (error) {
      setJsonData('Invalid JSON');
    }
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
      <section className="py-5">
        <div className="flex flex-wrap justify-evenly">
          <textarea
            className="w-[351px] p-4"
            rows="8"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="flex justify-center items-center p-4">
            <ButtonT onClick={handleConvertToJson}>Convert to JSON</ButtonT>
          </div>
          <pre className="w-[351px] p-4">{jsonData}</pre>
        </div>
      </section>
      <section className="flex flex-wrap py-5">
        <ButtonT
          className="!bg-[#cca300] hover:!bg-[#806600] mx-2"
          size="md"
          variant="primary"
          onClick={addUserHandler}>
          Create User
        </ButtonT>
        <ButtonT
          className="!bg-[#cca300] hover:!bg-[#806600] mx-2"
          size="md"
          variant="primary"
          onClick={addTaskHandler}>
          Create Task
        </ButtonT>
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
        {newUser != null && (
          <div>
            <h1>Welcome {newUser.user.name}</h1>
            <Profile user={newUser.user} />
          </div>
        )}
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
      <section className='py-5"'>
        {newTask != null && (
          <div>
            <h1>Tasks Created!</h1>
            <TaskList tasks={[newTask]} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
