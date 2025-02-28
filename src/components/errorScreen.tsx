import Image from "next/image";
import { errorImg } from "public";
import React from "react";
import { MainPageTemplate } from "~/templates";
interface ErrorProps {
  errorString?: string;
  onClick?: () => void;
}
const ErrorScreen: React.FunctionComponent<ErrorProps> = ({
  errorString,
  onClick,
}) => {
  return (
    <MainPageTemplate>
      <div className="flex h-full w-full flex-col items-center justify-center self-center justify-self-center bg-white">
        <Image src={errorImg} alt="" className="h-24 w-24" />
        <p>{errorString ?? "Error Occured"}</p>
        <button className="h-10 w-24 bg-[#F36562] text-white" onClick={onClick}>
          Ok
        </button>
      </div>
    </MainPageTemplate>
  );
};

export default ErrorScreen;
