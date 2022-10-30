import Layout from '@components/Layout';
import ImageUpload from '@components/shared/ImageUpload';
import Spinner from '@components/shared/Spinner';
import { Home } from '@lib/interfaces';
import { toastInstance } from '@lib/Toast';
import { NextPageWithLayout } from '@pages/_app';
import { RootState } from '@store/index';
import { addHome } from '@store/modules/homes.slice';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { CtxOrReq } from 'next-auth/client/_utils';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

const CreateHome: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isHomesLoading, createdHome, homesError } = useAppSelector((state: RootState) => state.homesStore);
    const formDefaultValues: Home = {
        image: '',
        title: '',
        description: '',
        country: '',
        state: '',
        address: '',
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
        reset,
        formState: { errors },
    } = useForm({ defaultValues: formDefaultValues });
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');
    const uploadImage = async (image: any) => {
        console.log({ image });
        setIsDisabled(true);
        try {
            const { data } = await axios.post('/api/image-upload', { image });
            console.log({ data });
            setImageUrl(data.url);
            toastInstance('Image successfully updated.', 'success');
        } catch (error) {
            toastInstance('Unable to upload image. Please try again.', 'error');
            setImageUrl('');
        } finally {
            setIsDisabled(false);
        }
    };
    const onSubmit = (formData: Home) => {
        dispatch(addHome({ ...formData, image: imageUrl }))
            .then(() => {
                toastInstance('Your home has been successfully added.', 'success');
                reset();
                router.push('/');
            })
            .catch((e) => toastInstance('Unable to submit, please try again.', 'error'));
    };

    return (
        <>
            <Spinner isVisible={isHomesLoading}></Spinner>
            <section className="heading flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl">List your home</h1>
                    <p className="opacity-60 mt-1">Fill out the form below to list a new home.</p>
                </div>

                <button className="btn btn-ghost text-error btn-sm" onClick={() => router.push('/')}>
                    back
                </button>
            </section>
            <section className="image my-3">
                <ImageUpload label={'Image'} onChangePicture={uploadImage}></ImageUpload>
            </section>
            <section className="title form-control w-full mb-1">
                <label className="label">Title</label>
                <input
                    type="text"
                    {...register('title', {
                        required: 'Title is required',
                        maxLength: { value: 80, message: 'Title cannot exceed more than 80 characters.' },
                    })}
                    placeholder="Type here"
                    className={`input input-bordered w-full ${errors?.title ? 'input-error' : null}`}
                />
                <p className="mt-2 error-text">{errors?.title?.message}</p>
            </section>
            <section className="description form-control w-full mb-2">
                <label className="label">Description</label>
                <textarea
                    {...register('description', {
                        required: 'Description is required',
                        maxLength: { value: 350, message: 'Description cannot exceed more than 350 characters.' },
                    })}
                    className={`textarea ${errors?.description ? 'textarea-error' : null} textarea-bordered`}
                    rows={4}
                    placeholder="Type here"
                ></textarea>
                <p className="mt-2 error-text">{errors?.description?.message}</p>
            </section>
            <section className="flex gap-3 flex-wrap md:flex-nowrap mb-2">
                <div className="form-control w-full max-w-[10.4rem] md:max-w-full">
                    <label className="label">Address</label>
                    <input
                        type="text"
                        placeholder="Type here"
                        {...register('address', { required: 'Address is required' })}
                        className={`input input-bordered w-full ${errors?.address ? 'input-error' : null}`}
                    />
                    <p className="mt-2 error-text">{errors?.address?.message}</p>
                </div>
                <div className="form-control w-full max-w-[10.4rem] md:max-w-full">
                    <label className="label">State</label>
                    <input
                        type="text"
                        placeholder="Type here"
                        {...register('state', { required: 'State is required' })}
                        className={`input input-bordered w-full ${errors?.state ? 'input-error' : null}`}
                    />

                    <p className="mt-2 error-text">{errors?.state?.message}</p>
                </div>
                <div className="form-control w-full max-w-sm md:max-w-full">
                    <label className="label">Country</label>
                    <input
                        type="text"
                        placeholder="Type here"
                        {...register('country', { required: 'Country is required.' })}
                        className={`input input-bordered w-full ${errors?.country ? 'input-error' : null}`}
                    />
                </div>
                <p className=" error-text">{errors?.country?.message}</p>
            </section>

            <section className="details form-control w-full max-w-sm md:max-w-full mb-2">
                <label className="label">Price Per Night</label>
                <input
                    type="number"
                    placeholder="Type here"
                    {...register('price', {
                        required: 'Price is required',
                        minLength: { value: 2, message: 'Price cannot be less than 2 characters.' },
                        maxLength: { value: 7, message: 'Price cannot be more than 7 characters.' },
                    })}
                    className={`input input-bordered w-full ${errors?.price ? 'input-error' : null}`}
                />
                <p className="mt-2 error-text">{errors?.price?.message}</p>
            </section>
            <section className="flex gap-3 flex-wrap md:flex-nowrap mb-2">
                <div className="form-control w-full max-w-sm md:max-w-full">
                    <label className="label">Guests</label>
                    <input
                        type="number"
                        placeholder="Type here"
                        {...register('guests', { required: 'Number of guests is required.' })}
                        className={`input input-bordered w-full ${errors?.price ? 'input-error' : null}`}
                    />

                    <p className="mt-2 error-text">{errors?.guests?.message}</p>
                </div>
                <div className="form-control w-full max-w-sm md:max-w-full">
                    <label className="label">Beds</label>
                    <input
                        type="number"
                        placeholder="Type here"
                        {...register('beds', { required: 'Number of beds is required.' })}
                        className={`input input-bordered w-full ${errors?.price ? 'input-error' : null}`}
                    />

                    <p className="mt-2 error-text">{errors?.beds?.message}</p>
                </div>
                <div className="form-control w-full max-w-sm md:max-w-full">
                    <label className="label">Bathrooms</label>
                    <input
                        type="number"
                        placeholder="Type here"
                        {...register('baths', { required: 'Number of bathrooms is required.' })}
                        className={`input input-bordered w-full ${errors?.baths ? 'input-error' : null}`}
                    />

                    <p className="mt-2 error-text">{errors?.baths?.message}</p>
                </div>
            </section>
            {isHomesLoading ? (
                <button className="btn btn-primary mt-6 w-full loading"></button>
            ) : (
                <button className="btn btn-primary mt-6 w-full" onClick={handleSubmit(onSubmit)}>
                    Submit
                </button>
            )}
            <ToastContainer />
        </>
    );
};

export default CreateHome;
CreateHome.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context: CtxOrReq) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
            },
        };
    }
    return {
        props: {
            session: JSON.parse(JSON.stringify(session)),
        },
    };
};
