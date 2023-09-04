import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';
import AuthContext from '../store/auth-context';

const RootLayout = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
      <MainNavigation />
      <div className="p-8 flex justify-center">
        {ctx.isLoggedIn ? `Welcome ${ctx.userData.user.name}` : `Need to Log In or Create New User`}
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
