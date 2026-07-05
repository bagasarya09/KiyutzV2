import Sidebar from '@/Components/Admin/Sidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F8F9FE]">
            <Sidebar />
            {/* offset: kiri 72px (lebar sidebar collapse) di desktop, atas 64px (header) di mobile */}
            <main className="pt-16 lg:pl-[72px] lg:pt-0">
                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}