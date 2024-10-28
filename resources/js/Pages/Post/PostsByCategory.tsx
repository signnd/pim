import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

// Define the type for a single post

interface Post {
    id: number;
    title: string;
    description: string;
    created_at: string;
    category: string;
}

// Adjust the type to reflect the correct structure of posts
interface Posts {
    data: Post[];
}

const PostsByCategory = ({ auth }: PageProps) => {
    const { posts, category } = usePage().props;
    const data: Post[] = posts;

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts in "{category}"</h2>}
    >

        <Head title="Index" />
        <div className="container mx-auto px-9 pb-8 mt-4">
                <div className="flex items-center justify-between mb-6">
                </div>

        <div>
            <div className="grid gap-5 lg:grid-cols-2">
            {data.length > 0 ? (
                data.map(({ id, title, description, created_at }) => (
                    <Link className="w-full border border-gray-200 bg-white hover:bg-slate-50 rounded-lg shadow-md lg:max-w-xl" href={route("posts.show", id)} key={id}>
                    <div className="p-5">
                        <p className="font-thin text-sm text-gray-700">{new Date(created_at).toLocaleDateString("id-ID")}</p>
                        <h4 className="text-xl font-semibold text-blue-600">
                            {title.length < 145 ? title : `${title.substring(0, 146)}...`}
                        </h4>
                        <p className="mb-2 leading-normal">
                            {description.length < 145 ? description : `${description.substring(0, 146)}...`}
                        </p>
                    </div>
                    </Link>
                ))
    ) : (
                <p>No posts available in this category.</p>
            )}
        </div>
        </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default PostsByCategory;
