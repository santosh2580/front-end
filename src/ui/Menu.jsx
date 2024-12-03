import { NavLink } from 'react-router-dom';
import { useSecurity } from '../hooks/SecurityProvider';

const Menu = () => {
  const {logout} = useSecurity()
  return (
    <div className="flex w-full items-center justify-between p-2">
      <div>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/console"
              className={({ isActive }) =>
                `text-2xl font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'border-b-2 border-blue-600 text-blue-600' // Active state styling
                    : 'text-stone-800 hover:text-stone-600 focus:text-stone-600'
                }`
              }
            >
              <span>Play</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `text-2xl font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'border-b-2 border-blue-600 text-blue-600' // Active state styling
                    : 'text-stone-800 hover:text-stone-600 focus:text-stone-600'
                }`
              }
            >
              <span>Setting</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <button className="inline-block rounded-full border-2 border-stone-300 bg-blue-800 px-4 py-2.5 
        text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 
        hover:text-white focus:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-2 
        disabled:cursor-not-allowed md:px-6 md:py-3.5"
         onClick={logout}
         >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
