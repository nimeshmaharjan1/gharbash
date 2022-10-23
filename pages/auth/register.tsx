import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { GoHome } from "react-icons/go";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="card bg-base-100 shadow-md drop-shadow-sm">
        <div className="card-body">
          <div className="w-full flex justify-center">
            <div
              className="brand cursor-pointer font-serif font-[900] text-xl md:text-2xl text-primary flex items-center gap-[0.3rem]"
              onClick={() => router.push("/")}
            >
              <GoHome size={42}></GoHome>Gharbash
            </div>
          </div>
          <div className="card-title">Register</div>
          <section className="title form-control w-full mb-1">
            <label className="label">Email</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 80, message: "Title cannot exceed more than 80 characters." },
              })}
              placeholder="Type here"
              className={`input input-bordered w-full ${errors?.title ? "input-error" : null}`}
            />
            {/* <p className="mt-2 error-text">{errors}</p> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
