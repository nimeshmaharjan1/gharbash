import React from "react";
import { Triangle } from "react-loader-spinner";
const Spinner: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <Triangle
    height="120"
    width="120"
    color="#880808"
    ariaLabel="triangle-loading"
    wrapperClass="absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[100] backdrop-blur-lg flex justify-center items-center"
    visible={isVisible}
  />
);

export default Spinner;
