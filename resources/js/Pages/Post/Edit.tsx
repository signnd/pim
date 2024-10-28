import React, { useEffect, useState } from "react";
import { Link, usePage, useForm, router  } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

// Define types for form data and errors
interface Post {
    id: number;
    title: string;
    description: string;
    updated_at: string;
    categories: string;
}

interface FormErrors {
    title?: string;
    description?: string;
}

const Edit = ({ auth }: PageProps) => {
    const { post }: { post: Post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        description: post.description || "",
        updated_at: post.updated_at || "",
        categories: post.categories || ""
    });
    const [categoryInput, setCategoryInput] = useState(post.categories || '');
    const handleInputChange = (e) => {
        setCategoryInput(e.target.value);
        setData('categories', e.target.value);
    };


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }

    function destroy() {
        if (confirm("Apakah Anda yakin ingin menghapus post ini?")) {
            router.delete(route("posts.destroy", post.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="text-xl font-semibold leading-tight">
                <Link
                    href={route("posts.index")}
                    className="text-blue-600 hover:text-blue-700"
                >
                    Posts
                </Link>
                <span className="font-medium text-blue-600"> / </span>
                Edit
                <span className="font-thin text-sm align-middle float-right text-gray-700">Last Modified: {new Date(data.updated_at).toLocaleString("id-ID")}</span>
            </h2>
            }
        >
            <Head title="Edit" />
            <div className="container mx-auto px-12 mt-8 pb-8 max-w-screen-xl">
                <div>
                </div>
                <div className="max-w-6xl p-8 bg-white rounded shadow">
                    <form name="editForm" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <div>
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
                            <div>
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
                                    value={categoryInput}
                                    onChange={handleInputChange}
                                />
                                {errors.title && (
                                    <span className="text-red-600 text-sm">
                                        {errors.title}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={destroy}
                                tabIndex={-1}
                                type="button"
                                className="px-3 py-1.5 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-1.5 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;