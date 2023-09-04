import { NavLink } from 'react-router-dom';

function RequestNavigation() {
  return (
    <header className="p-8 flex justify-center">
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/requests/userlogin"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#806600]' : 'text-[#ffffff] '
                } !bg-[#cca300] hover:!bg-[#806600] p-[10px] rounded-md`
              }
              end>
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests/createuser"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#806600] ' : 'text-[#ffffff]'
                } !bg-[#cca300] hover:!bg-[#806600] p-[10px] rounded-md`
              }>
              Create User
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests/createtask"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#806600] ' : 'text-[#ffffff]'
                } !bg-[#cca300] hover:!bg-[#806600] p-[10px] rounded-md`
              }>
              Create Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests/getprofile"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#008040] ' : 'text-[#ffffff]'
                } !bg-[#00CC66] hover:!bg-[#008040] p-[10px] rounded-md`
              }>
              Get Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests/gettasks"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#008040] ' : 'text-[#ffffff]'
                } !bg-[#00CC66] hover:!bg-[#008040] p-[10px] rounded-md`
              }>
              Get Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests/logout"
              className={({ isActive }) =>
                `${
                  isActive ? 'text-[#808080] !bg-[#806600] ' : 'text-[#ffffff]'
                } !bg-[#cca300] hover:!bg-[#806600] p-[10px] rounded-md`
              }>
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default RequestNavigation;
