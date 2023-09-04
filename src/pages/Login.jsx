import { useState, useEffect, useContext } from 'react';

import { ButtonT, Input, PageContent } from '../TailwindComponents';
import useHttps from '../hooks/use-https';
import AuthContext from '../store/auth-context';

const baseUrl = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const defaultInfo = {
    email: 'foo@mail.com',
    password: '1234567890'
  };

  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const [formData, setFormData] = useState(defaultInfo);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (error == null) {
      return;
    }

    alert(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saveLogInUser = (object) => {
      ctx.onLogin(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/users/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData, null, 2)
      },
      saveLogInUser
    );
  };

  return (
    <PageContent title="Log In">
      {isLoading ? 'Login User' : ''}
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <ButtonT type="submit" className="w-full px-4 py-2 hover:!bg-[#a6a6a6]">
          Submit
        </ButtonT>
      </form>
    </PageContent>
  );
};

export default LoginPage;
