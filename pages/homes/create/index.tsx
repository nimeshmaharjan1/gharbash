import Layout from "@components/Layout";
import { Home } from "@lib/interfaces";
import { NextPageWithLayout } from "@pages/_app";
import { RootState } from "@store/index";
import { addHome } from "@store/modules/homes.slice";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";

import { useForm } from "react-hook-form";

const CreateHome: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const { isHomesLoading, createdHome, homesError } = useAppSelector((state: RootState) => state.homesStore);
  const formDefaultValues: Home = {
    image: "",
    title: "",
    description: "",
    country: "",
    state: "",
    address: "",
    price: null,
    guests: null,
    beds: null,
    baths: null,
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: formDefaultValues });
  const onSubmit = (formData: Home) => {
    dispatch(addHome(formData));
    console.log({ createdHome });
  };
  return (
    <>
      <section className="heading">
        <h1 className="font-bold text-2xl">List your home</h1>
        <p className="opacity-60 mt-1">Fill out the form below to list a new home.</p>
      </section>
      <section className="image my-3">
        <label className="inline-block mb-2 ">Image</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Upload</p>
            </div>
            <input type="file" className="opacity-0" />
          </label>
        </div>
      </section>
      <section className="title form-control w-full mb-1">
        <label className="label">Title</label>
        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 80, message: "Title cannot exceed more than 80 characters." },
          })}
          placeholder="Type here"
          className={`input input-bordered w-full ${errors?.title ? "input-error" : null}`}
        />
        <p className="mt-2 error-text">{errors?.title?.message}</p>
      </section>
      <section className="description form-control w-full mb-2">
        <label className="label">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            maxLength: { value: 350, message: "Description cannot exceed more than 350 characters." },
          })}
          className={`textarea ${errors?.description ? "textarea-error" : null} textarea-bordered`}
          rows={4}
          placeholder="Type here"
        ></textarea>
        <p className="mt-2 error-text">{errors?.description?.message}</p>
      </section>
      <section className="flex gap-3 flex-wrap md:flex-nowrap mb-2">
        <div className="form-control w-full max-w-[10.4rem] md:max-w-xs">
          <label className="label">Address</label>
          <input
            type="text"
            placeholder="Type here"
            {...register("address", { required: "Address is required" })}
            className={`input input-bordered w-full ${errors?.address ? "input-error" : null}`}
          />
          <p className="mt-2 error-text">{errors?.address?.message}</p>
        </div>
        <div className="form-control w-full max-w-[10.4rem] md:max-w-xs">
          <label className="label">State</label>
          <input
            type="text"
            placeholder="Type here"
            {...register("state", { required: "State is required" })}
            className={`input input-bordered w-full ${errors?.state ? "input-error" : null}`}
          />

          <p className="mt-2 error-text">{errors?.state?.message}</p>
        </div>
        <div className="form-control w-full max-w-sm md:max-w-full">
          <label className="label">Country</label>
          <input
            type="text"
            placeholder="Type here"
            {...register("country", { required: "Country is required." })}
            className={`input input-bordered w-full ${errors?.country ? "input-error" : null}`}
          />
        </div>
        <p className=" error-text">{errors?.country?.message}</p>
      </section>

      <section className="details form-control w-full max-w-sm md:max-w-full mb-2">
        <label className="label">Price Per Night</label>
        <input
          type="number"
          placeholder="Type here"
          {...register("price", {
            required: "Price is required",
            minLength: { value: 2, message: "Price cannot be less than 2 characters." },
            maxLength: { value: 7, message: "Price cannot be more than 7 characters." },
          })}
          className={`input input-bordered w-full ${errors?.price ? "input-error" : null}`}
        />
        <p className="mt-2 error-text">{errors?.price?.message}</p>
      </section>
      <section className="flex gap-3  mb-2">
        <div className="form-control w-full max-w-xs">
          <label className="label">Guests</label>
          <input
            type="number"
            placeholder="Type here"
            {...register("guests", { required: "Number of guests is required." })}
            className={`input input-bordered w-full ${errors?.price ? "input-error" : null}`}
          />

          <p className="mt-2 error-text">{errors?.guests?.message}</p>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Beds</label>
          <input
            type="number"
            placeholder="Type here"
            {...register("beds", { required: "Number of beds is required." })}
            className={`input input-bordered w-full ${errors?.price ? "input-error" : null}`}
          />

          <p className="mt-2 error-text">{errors?.beds?.message}</p>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Bathrooms</label>
          <input
            type="number"
            placeholder="Type here"
            {...register("baths", { required: "Number of bathrooms is required." })}
            className={`input input-bordered w-full ${errors?.baths ? "input-error" : null}`}
          />

          <p className="mt-2 error-text">{errors?.baths?.message}</p>
        </div>
      </section>
      {isHomesLoading ? (
        <button className="btn btn-primary mt-6 w-full loading" onClick={handleSubmit(onSubmit)}></button>
      ) : (
        <button className="btn btn-primary mt-6 w-full" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      )}
    </>
  );
};

export default CreateHome;
CreateHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
