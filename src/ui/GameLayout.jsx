import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const GameLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <div className="flex items-center justify-around border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
        <Menu />
      </div>
      <div className="flex w-full justify-center">
       <Outlet />
      </div>
    </div>
  );
};

export default GameLayout;
