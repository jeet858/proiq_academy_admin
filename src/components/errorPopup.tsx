import React from "react";
import Image from "next/image";
import { errorImg } from "public";
interface ErrorPopupProps {
  message?: string;
  onClick?: () => void;
}
const ErrorPopup: React.FunctionComponent<ErrorPopupProps> = (props) => {
  return (
    <div className="flex h-2/5 w-2/5 flex-col items-center justify-evenly bg-white">
      <Image src={errorImg} alt="" className="h-24 w-24" />
      <p>{props.message}</p>
      <button
        className="h-10 w-24 bg-[#F36562] text-white"
        onClick={props.onClick}
      >
        Ok
      </button>
    </div>
  );
};

export default ErrorPopup;
