import { Outlet } from 'react-router-dom';
import RequestNavigation from '../Components/RequestNavigation';

const RequestRootLayout = () => {
  return (
    <>
      <RequestNavigation />
      <Outlet />
    </>
  );
};

export default RequestRootLayout;
