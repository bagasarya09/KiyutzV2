import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Categories() {
    return (
        <AdminLayout>
            <Head title="Categories" />
            <h1 className="text-2xl font-bold text-[#0B1F33]">Categories</h1>
            <p className="mt-2 text-sm text-[#6C7095]">Selamat datang di panel admin Kiyutz.</p>
        </AdminLayout>
    );
}