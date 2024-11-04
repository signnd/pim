import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

// Define the type for a single post
interface Category {
    id: number;
    categories: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    created_at: string;
    published_at: string;
    categories: Category[];
}

// Adjust the type to reflect the correct structure of posts
interface Posts {
    data: Post[];
}

const Index = ({ auth }: PageProps) => {
    const { posts, flash } = usePage().props;
    // State untuk menampilkan atau menyembunyikan toast
    const [showToast, setShowToast] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    
    // Menangkap flash message dan menampilkan toast jika ada
    useEffect(() => {
        if (flash) {
            setShowToast(true);
            setFadeOut(false);

            // // Setelah 3 detik, sembunyikan toast
            // setTimeout(() => {
            //     setShowToast(false);
            // }, 3000);
            // Set timer untuk memulai fade out setelah 2,5 detik
            
            const fadeOutTimer = setTimeout(() => {
                setFadeOut(true);
            }, 3000);

            // Sembunyikan toast setelah 3 detik
            const hideToastTimer = setTimeout(() => {
                setShowToast(false);
            }, 3500);

            // Bersihkan timer saat efek selesai
            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(hideToastTimer);
            };
        }
    }, [flash]);

    const data: Post[] = posts; 


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts Index</h2>}
        >

            <Head title="Index" />

            <div className="container mx-auto px-9 pb-8 mt-4">
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        className="px-3 py-1.5 text-white bg-blue-500 rounded-md focus:outline-none"
                        href={route("posts.create")}
                    >
                        Create Post
                    </Link >
                </div>

                <div className="overflow-x-auto">
                {/* card reference: https://flowbite.com/docs/components/card/# */}
                    <div className="grid gap-5 lg:grid-cols-2">
                    {data.length > 0 ? (
                        data.map(({ id, title, description, created_at, published_at, categories }) => (
                            <Link className="w-full border border-gray-200 bg-white hover:bg-slate-50 rounded-lg shadow-md lg:max-w-xl" href={route("posts.show", id)} key={id}>
                            <div className="p-5">
                                <p className="font-thin text-sm text-gray-700">{new Date(published_at).toLocaleDateString("id-ID")}
                                {/* Display the categories */}
                                    {categories.length >= 0 ? (
                                        categories.map((category) => (
                                            <Link
                                                href={route('categories.posts', category.id)} // URL untuk kategori
                                                className="text-gray-600"
                                                key={category.id}>
                                            <span key={category.id} className="p-1 mx-1 bg-slate-200 rounded hover:bg-slate-300">
                                                {category.categories}
                                            </span>
                                            </Link>
                                        ))
                                    ) : (
                                        <span></span>
                                    )}
                                </p>      
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
                            <tr>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </div>
                </div>
            </div>
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-5 right-5 z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center max-w-xs w-full bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg">
                        <svg
                            className="w-6 h-6 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        <span>{flash}</span>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Index;