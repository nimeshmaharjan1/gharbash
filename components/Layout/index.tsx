import Footer from "@components/shared/Footer";
import Header from "@components/shared/Header";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isUserLoading = status === "loading";
  return (
    <>
      <Head>
        <title>Gharbash</title>
      </Head>
      <Header></Header>
      <main className="container">{children}</main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
