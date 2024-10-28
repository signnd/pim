import React, { useState } from "react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

// Define the types for form data and errors
interface FormData {
    title: string;
    description: string;
    categories: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    categories?: string;
}

const Create = ({ auth }: PageProps) => {
    const { data, setData, errors, post, } = useForm<FormData>({
        title: "",
        description: "",
        categories: ""
    });

    //const [categoryInput, setCategoryInput] = useState(post.categories || '');
    const handleInputChange = (e) => {
        //setCategoryInput(e.target.value);
        setData('categories', e.target.value);
    };


    // Handle form submission
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("posts.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight">
                <Link
                    href={route("posts.index")}
                    className="text-blue-600 font-bold hover:text-blue-700"
                >
                    Posts
                </Link>
                <span className="font-medium text-blue-600"> / </span>
                Create
            </h2>}
        >
            <Head title="Create New" />
                <div className="container mx-auto px-12 mt-8 pb-8 max-w-screen-xl">

                    <div className="max-w-6xl p-8 bg-white rounded shadow">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <span className="text-red-600 text-sm">
                                            {errors.title}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        name="description"
                                        rows="15"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    {errors.description && (
                                        <span className="text-red-600 text-sm">
                                            {errors.description}
                                        </span>
                                    )}
                                </div>
                                <div>
                                <label htmlFor="category" className="block text-gray-700">Add Category</label>
                                <input
                                    type="text"
                                    id="categories"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    name="categories"
                                    value={data.categories}
                                    onChange={handleInputChange}
                                />
                                {errors.title && (
                                    <span className="text-red-600 text-sm">
                                        {errors.title}
                                    </span>
                                )}
                            </div>
                            <div className="pt-5">
                                <button
                                    type="submit"
                                    className="px-3 py-1.5 float-right text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>

                            </div>
                        </form>
                    </div>
                </div>
           
        </AuthenticatedLayout>
    );
};

export default Create;
{/* todo: implement markdown in text field */}