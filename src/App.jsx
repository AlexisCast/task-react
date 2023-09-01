import { useState, useRef, useEffect } from 'react';

import TaskList from './Components/TaskList';
import Profile from './Components/Profile';
import useHttps from './hooks/use-https';

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

  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [newTask, setNewTask] = useState(null);

  const [inputValue, setInputValue] = useState(defaultJson);
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      console.log('if');
      setUserData(JSON.parse(storedUserData));
    } else {
      console.log('else');
      localStorage.setItem('userData', JSON.stringify({ token: null }));
      setUserData(null);
    }
  }, []);

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
    const saveMessage = (object) => {
      setMessage(object.text);
    };

    sendRequest(
      {
        url: `${baseUrl}/`
      },
      saveMessage
    );
  };

  const fetchTasksHandler = async () => {
    const saveTask = (object) => {
      setTasks(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/tasks`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      },
      saveTask
    );
  };

  const fetchProfileHandler = async () => {
    const saveUser = (object) => {
      setUser(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/users/me`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      },
      saveUser
    );
  };

  const addUserHandler = async () => {
    const saveAddUser = (object) => {
      setNewUser(object);
      localStorage.setItem('userData', JSON.stringify(object));
    };

    sendRequest(
      {
        url: `${baseUrl}/users`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      },
      saveAddUser
    );
  };

  const addTaskHandler = async () => {
    const saveTask = (object) => {
      setNewTask(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/tasks`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },
        body: jsonData
      },
      saveTask
    );
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
          onClick={fetchTasksHandler}>
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
