import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import Main from './pages/Main';
import RootLayout from './pages/Root';
import NewsletterPage from './pages/Newsletter';
import ErrorPage from './pages/Error';
import RequestRootLayout from './pages/RequestRoot';
import LoginPage from './pages/Login';
import CreateUserPage from './pages/CreateUser';
import CreateTaskPage from './pages/CreateTask';
import GetProfilePage from './pages/GetProfile';
import GetTasksPage from './pages/GetTasks';
import LogOut from './pages/LogOut';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'requests',
        element: <RequestRootLayout />,
        children: [
          {
            path: 'userlogin',
            element: <LoginPage />
          },
          {
            path: 'createuser',
            element: <CreateUserPage />
          },
          {
            path: 'createtask',
            element: <CreateTaskPage />
          },
          {
            path: 'getprofile',
            element: <GetProfilePage />
          },
          {
            path: 'gettasks',
            element: <GetTasksPage />
          },
          {
            path: 'logout',
            element: <LogOut />
          }
        ]
      },
      {
        path: '/main',
        element: <Main />
      },
      {
        path: '/newsletter',
        element: <NewsletterPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
