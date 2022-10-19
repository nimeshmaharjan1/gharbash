import React from "react";

import Spinner from "@components/shared/Spinner";

import Layout from "@components/Layout";
import Card from "@components/pages/home/Card";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <Spinner isVisible={isLoading}></Spinner>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 ">
        <Card></Card>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
