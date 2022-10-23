import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GoHome } from "react-icons/go";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  console.log(session);
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
        <div
          className="brand cursor-pointer font-serif font-[900] text-xl md:text-2xl text-primary flex items-center gap-[0.3rem]"
          onClick={() => router.push("/")}
        >
          <GoHome size={42}></GoHome>Gharbash
        </div>
        <nav className="flex gap-2 md:gap-3 items-center">
          {!isCreateHome && (
            <button className="btn btn-ghost btn-sm" onClick={() => router.push("/homes/create")}>
              List your home
            </button>
          )}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar online cursor-pointer">
                <div className="w-12 rounded-full  transition-all duration-100 hover:border-4 border-secondary">
                  <img className="rounded-full" src="https://placeimg.com/192/192/people" />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Profile</a>
                </li>
                {!isCreateHome && (
                  <li>
                    <Link href="/homes/create">List your home</Link>
                  </li>
                )}
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              login
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
