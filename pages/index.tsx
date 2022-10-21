import React from "react";

import Spinner from "@components/shared/Spinner";

import Layout from "@components/Layout";
import Card from "@components/pages/home/Card";
import { Home } from "@lib/interfaces";
import { PrismaClient } from "@prisma/client";
import { NextPageWithLayout } from "./_app";

const prisma = new PrismaClient();

const Home: NextPageWithLayout<{ homes: Home[] }> = ({ homes }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <Spinner isVisible={isLoading}></Spinner>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 justify-items-center">
        {homes.map((home: Home, index: number) => (
          <Card {...{ home }} key={home.id}></Card>
        ))}
        {homes.map((home: Home, index: number) => (
          <Card {...{ home }} key={home.id}></Card>
        ))}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export async function getServerSideProps() {
  const homes = (await prisma.home.findMany()) as Home[];
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}
