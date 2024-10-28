import { Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link 
                        className="px-3 py-1.5 text-white bg-blue-500 rounded-md focus:outline-none"
                        href={route("posts.index")}
                    >
                        Go to Posts
                    </Link >
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
