import { Link, NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <header className="p-8 flex justify-center">
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-[#806600]' : 'text-[#808080]')}
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) => (isActive ? 'text-[#806600]' : 'text-[#808080]')}>
              Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) => (isActive ? 'text-[#806600]' : 'text-[#808080]')}>
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
