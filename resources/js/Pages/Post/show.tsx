import React from "react";
import { Link, usePage, useForm, router  } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import '@/additional.css';

// Define types for form data and errors
interface Post {
    id: number;
    title: string;
    description: string;
    updated_at: string;
    created_at: string;
    categories: string;
}

interface FormErrors {
    title?: string;
    description?: string;
}

const Edit = ({ auth }: PageProps) => {
    const { post }: { post: Post } = usePage().props;
    const { data } = useForm({
        id: post.id || "",
        title: post.title || "",
        description: post.description || "",
        updated_at: post.updated_at || "",
        created_at: post.created_at || "",
        categories: post.categories || ""
    });
    console.log(post);
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }

    function destroy() {
        if (confirm("Are you sure you want to delete this post?")) {
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
                Show
            </h2>
            }
        >
            <Head title="Show" />
            <div className="container mx-auto px-12 pb-8 mt-8 max-w-screen-xl">
                <div className="max-w-6xl p-8 bg-white rounded shadow">
                        <div className="flex flex-col space-y-4">
                            <div>
                            <div className="float-right space-x-3 mt-3 px-2">
                        <Link 
                                className="px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                href={route("posts.edit", {post})}
                            >
                                Edit
                            </Link>
                            <button
                                onClick={destroy}
                                tabIndex={-1}
                                type="button"
                                className="px-3 py-1.5 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                                <p id="title" className="w-full py-2 text-3xl font-extrabold">{data.title}</p>
                            </div>
                            <div>
                                <p id="description" className="w-full text-lg font-light">{data.description}</p>
                            </div>
                            <div>
                                <p id="categories" className="w-full text-lg font-light">
                            {/* todo: bug: nama category belum muncul, sementara simpen kode dari chatgpt */}
                {post.categories && post.categories.length > 0 ? (
                    post.categories.map((category) => (
                        <Link
                            href={route('categories.posts', category.id)} // URL untuk kategori
                            key={category.id}
                            className="text-blue-500 hover:underline"
                        >
                        <span key={category.id} className="p-2 mr-3 bg-slate-200 rounded">
                            {category.categories}
                        </span>
                        </Link>
                    ))
                ) : (
                    <p></p>
                )}
                                </p>
                            </div>
                        <p className="font-thin text-sm text-gray-700">Created at {new Date(data.created_at).toLocaleString("id-ID")}</p>
                        <p className="font-thin text-sm text-gray-700">Last modified {new Date(data.updated_at).toLocaleString("id-ID")}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;