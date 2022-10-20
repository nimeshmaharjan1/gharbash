import { useRouter } from "next/router";
import React from "react";
import { GoHome } from "react-icons/go";

const Header = () => {
  const router = useRouter();
  const [isCreateHome, setIsCreateHome] = React.useState(false);
  React.useEffect(() => {
    if (router.pathname === "/homes/create") {
      setIsCreateHome(true);
    } else {
      setIsCreateHome(false);
    }
  }, [router]);
  return (
    <div className="wrapper mb-6 shadow-md shadow-gray-400/20 ">
      <header className="flex justify-between items-center h-20 container">
        <div className="brand font-serif font-[900] text-xl md:text-2xl text-primary flex items-center gap-[0.3rem]">
          <GoHome size={42}></GoHome>Gharbash
        </div>
        <nav className="flex gap-2 items-center">
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
        </nav>
      </header>
    </div>
  );
};

export default Header;
