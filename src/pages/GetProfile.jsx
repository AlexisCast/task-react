import { useState, useEffect, useContext } from 'react';

import { PageContent } from '../TailwindComponents';
import useHttps from '../hooks/use-https';
import AuthContext from '../store/auth-context';
import Profile from '../Components/Profile';

const baseUrl = import.meta.env.VITE_BASE_URL;

const GetProfilePage = () => {
  const { isLoading, error, sendRequest: sendRequest } = useHttps();

  const ctx = useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (error == null) {
      return;
    }

    alert(error);
  }, [error]);

  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    const saveUser = (object) => {
      setUser(object);
    };

    sendRequest(
      {
        url: `${baseUrl}/users/me`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.userData.token}`
        }
      },
      saveUser
    );
  };

  return (
    <>
      <section className="py-5">
        <PageContent title="" className="!max-w-5xl">
          {isLoading && 'Fetching Profile'}
        </PageContent>

        {user != null && (
          <PageContent title="Get Profile" className="!max-w-5xl">
            <Profile user={user} />
          </PageContent>
        )}
      </section>
    </>
  );
};

export default GetProfilePage;
