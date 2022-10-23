import Spinner from "@components/shared/Spinner";
import { toastInstance } from "@lib/Toast";
import { NextPage } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { GoHome, GoMail } from "react-icons/go";

import styles from "./auth.module.css";

const SignUp: NextPage<{ session: any }> = ({ session }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const signInEmail = async ({ email }: { email: string }) => {
    console.log({ email });
    setIsLoading(true);
    try {
      const { error } = (await signIn("email", {
        redirect: false,
        callbackUrl: "/",
        email,
      })) as any;
      if (error) {
        throw new Error(error);
      }
      setSubmittedEmail(email);
      setShowConfirm(true);
    } catch (err) {
      toastInstance("Unable to sign in. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const signInWithGithub = async () => {
    setIsLoading(true);
    await signIn("github", {
      callbackUrl: "http://localhost:3000",
      redirect: false,
    });
  };
  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="card bg-base-100 shadow-md drop-shadow-sm w-72 md:w-96 relative">
        {showConfirm ? (
          <div className="card-body">
            <div className="flex justify-center">
              <GoMail size={42} color={"#880808"}></GoMail>
            </div>
            <div className="card-title text-center block">Confirm your email</div>
            <div className="p text-center text-sm md:text-[15px] opacity-80">
              We emailed a magic link to <span className="font-bold text-primary">{submittedEmail}</span>. Check your inbox and click the
              link in the email to login or sign up.
            </div>
          </div>
        ) : (
          <>
            <Spinner isVisible={isLoading}></Spinner>
            <div className="card-body">
              <div className="w-full flex justify-center items-center mb-1">
                <div className="brand cursor-pointer font-serif font-[900] text-lg md:text-[22px] text-primary flex items-center gap-[0.3rem] mb-1">
                  <GoHome size={24}></GoHome>Gharbash
                </div>
              </div>
              <div className="card-title font-extrabold text-center block">Create your account</div>
              <p className="text-center text-[12px] opacity-60">
                Please create an account to list your homes and bookmark your favorite ones.
              </p>
              <section className="title form-control w-full mb-1">
                <label className="label text-[12px] md:text-[14px] opacity-60">Email</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  placeholder="Type here"
                  className={`input input-bordered input-sm md:input-md w-full ${errors?.email ? "input-error" : null}`}
                />
                <p className="mt-2 error-text">{errors?.email?.message}</p>
                <button className=" btn-primary mt-3 btn-sm rounded-md" onClick={handleSubmit(signInEmail)}>
                  Submit
                </button>
              </section>
              <p className={`text-center text-sm opacity-60 mt-2 ${styles.providerLine}`}>Or sign up with</p>
              <section className="providers flex flex-col gap-1">
                <button className="h-[42px] w-full mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors mt-2 gap-2 font-bold">
                  <Image src="/icons/google.png" alt="Google" width={16} height={16} />
                  Google
                </button>

                <button
                  className="h-[42px] w-full mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors mt-2 gap-2 font-bold"
                  onClick={signInWithGithub}
                >
                  <Image src="/icons/github.png" alt="Github" width={16} height={16} />
                  Github
                </button>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;

export const getServerSideProps = async (context: CtxOrReq) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
