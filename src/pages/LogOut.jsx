import { useEffect, useContext } from 'react';

import { ButtonT, PageContent } from '../TailwindComponents';
import useHttps from '../hooks/use-https';
import AuthContext from '../store/auth-context';

const baseUrl = import.meta.env.VITE_BASE_URL;

const LogOut = () => {
  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (error == null) {
      return;
    }

    alert(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('x');
    console.log(ctx.userData.token);
    logOut();
  };

  const logOut = () => {
    const saveTask = () => {
      ctx.onLogout();
    };

    sendRequest(
      {
        url: `${baseUrl}/users/logout`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.userData.token}`
        }
      },
      saveTask
    );
  };

  return (
    <PageContent title="Log Out">
      {isLoading ? 'Login Out' : ''}
      <form onSubmit={handleSubmit}>
        <ButtonT type="submit" className="w-full px-4 py-2 hover:!bg-[#a6a6a6]">
          Submit
        </ButtonT>
      </form>
    </PageContent>
  );
};

export default LogOut;
