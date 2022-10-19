import { GoHome } from "react-icons/go";

const Header = () => {
  return (
    <div className="wrapper mb-4 shadow-md shadow-gray-400/20 ">
      <header className="flex justify-between items-center h-[4.5rem] container">
        <div className="brand font-serif font-[900] text-xl md:text-2xl text-primary flex items-center gap-[0.3rem]">
          <GoHome></GoHome>Gharbash
        </div>
        <nav className="flex gap-2 items-center">
          <button className="btn btn-ghost btn-sm">List your home</button>
          <button className="btn btn-primary btn-sm hidden sm:block">login</button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
