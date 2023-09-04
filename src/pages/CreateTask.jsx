import { useState, useEffect, useContext } from 'react';

import { ButtonT, Input, PageContent } from '../TailwindComponents';
import useHttps from '../hooks/use-https';
import AuthContext from '../store/auth-context';
import TaskList from '../Components/TaskList';

const baseUrl = import.meta.env.VITE_BASE_URL;

const CreateTaskPage = () => {
  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const ctx = useContext(AuthContext);

  const [newTask, setNewTask] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    completed: false
  });

  useEffect(() => {
    if (error == null) {
      return;
    }

    alert(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use the 'checked' property for checkbox inputs
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saveTask = (object) => {
      setNewTask(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/tasks`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.userData.token}`
        },
        body: JSON.stringify(formData, null, 2)
      },
      saveTask
    );
  };

  return (
    <>
      <PageContent title="Create Task">
        <form onSubmit={handleSubmit}>
          <Input
            label="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            className="!w-1/4"
            label="Completed"
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <ButtonT type="submit" className="w-full px-4 py-2 hover:!bg-[#a6a6a6]">
            Submit
          </ButtonT>
        </form>
      </PageContent>
      <section className="py-5">
        {newTask != null && (
          <PageContent title="Tasks Created!" className="!max-w-5xl">
            {isLoading ? 'Creating Task' : <TaskList tasks={[newTask]} />}
          </PageContent>
        )}
      </section>
    </>
  );
};

export default CreateTaskPage;
