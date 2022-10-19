import Header from "@components/shared/Header";
import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Gharbash</title>
      </Head>
      <Header></Header>
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
