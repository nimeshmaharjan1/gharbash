import { GoHome } from "react-icons/go";

const Footer = () => {
  return (
    <header className="flex justify-center items-center h-20 mt-10 border-t-2">
      <div className="brand font-serif font-[900] text-xl md:text-2xl text-primary flex items-center gap-[0.3rem]">
        <GoHome size={42}></GoHome>Gharbash
      </div>
      {/* <nav className="flex gap-2 items-center">
          {isCreateHome ? (
            <button className="btn btn-ghost btn-sm" onClick={() => router.push("/")}>
              Go back
            </button>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => router.push("/homes/create")}>
              List your home
            </button>
          )}
          <button className="btn btn-primary btn-sm hidden sm:block">login</button>
        </nav> */}
    </header>
  );
};

export default Footer;
