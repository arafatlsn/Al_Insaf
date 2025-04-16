"use client";
import { signIn } from "next-auth/react";
import GoogleIcon from "../Icons/GoogleIcon";

const AuthPage = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <h5 className="text-gray-800 text-[15px] font-semibold">
        Authentication required, Please signed in with Google
      </h5>
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-[.5rem] text-[14px] font-semibold uppercase bg-[#4989F3] text-white px-[1rem] py-[.4rem] rounded-[.3rem] mt-[1rem]"
      >
        <GoogleIcon />
        <span className="border-l-[1px] border-gray-200 pl-[.5rem]">
          Sign In with Google
        </span>
      </button>
    </div>
  );
};

export default AuthPage;
