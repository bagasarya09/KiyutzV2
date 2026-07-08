import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ChevronRight, LayoutDashboard, Package, Tags, LogOut, UserCircle, Menu, X,
    Store,ShieldCheck, Settings,
} from 'lucide-react';
import LogoKiyutz from '../../assets/LogoKiyutz.png';

const menuItems = [
  { label: 'Dashboard',  path: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Products',   path: '/admin/products',   icon: Package },
  { label: 'Categories', path: '/admin/categories', icon: Tags },
  { label: 'About', path: '/admin/about', icon: Store },
  { label: 'Keamanan', path: '/admin/security/two-factor', icon: ShieldCheck },
  { label: 'Pengaturan', path: '/admin/settings', icon: Settings },

];


const sidebarVariants = {
    open: { width: '280px' },
    closed: { width: '72px' },
};
const asideTransition = { type: 'tween', ease: 'easeOut', duration: 0.22 };
const brandInitial = { opacity: 0, x: -8 };
const brandAnimate = { opacity: 1, x: 0 };
const brandTransition = { duration: 0.18 };

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#F2F2F2] bg-white px-4 shadow-sm lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[#F8F9FE]">
                        <img src={LogoKiyutz} alt="Kiyutz Logo" className="h-8 w-8 object-contain" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold leading-none text-[#0B1F33]">Kiyutz</h1>
                        <p className="mt-1 text-xs font-medium text-[#6C7095]">Admin Panel</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F9FE] text-[#0B1F33] transition hover:bg-[#F2F2F2]"
                    aria-label="Open sidebar"
                >
                    <Menu size={22} />
                </button>
            </header>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-[#0B1F33]/45 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Desktop Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                initial={false}
                animate={isCollapsed ? 'closed' : 'open'}
                transition={asideTransition}
                onMouseEnter={() => setIsCollapsed(false)}
                onMouseLeave={() => setIsCollapsed(true)}
                className="fixed left-0 top-0 z-50 hidden h-screen overflow-hidden border-r border-[#F2F2F2] bg-white shadow-[8px_0_32px_rgba(11,31,51,0.04)] lg:block"
            >
                <SidebarContent isCollapsed={isCollapsed} onClose={() => setIsMobileOpen(false)} />
            </motion.aside>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-[280px] overflow-hidden border-r border-[#F2F2F2] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <SidebarContent isCollapsed={false} onClose={() => setIsMobileOpen(false)} />
            </aside>
        </>
    );
}

function SidebarContent({ isCollapsed, onClose }) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    

    return (
        <div className="flex h-full flex-col bg-white">
            {/* Brand */}
            <div className="flex h-20 shrink-0 items-center border-b border-[#F2F2F2] px-4">
                <Link
                    href="/admin/dashboard"
                    onClick={onClose}
                    className={`flex min-w-0 items-center gap-3 ${isCollapsed ? 'w-full justify-center' : ''}`}
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F8F9FE]">
                        <img src={LogoKiyutz} alt="Kiyutz Logo" className="h-9 w-9 object-contain" />
                    </div>
                    {!isCollapsed && (
                        <motion.div initial={brandInitial} animate={brandAnimate} transition={brandTransition} className="min-w-0">
                            <h2 className="truncate text-xl font-bold leading-none text-[#0B1F33]">Kiyutz</h2>
                            <p className="mt-1 truncate text-xs font-medium text-[#6C7095]">UMKM Profesional</p>
                        </motion.div>
                    )}
                </Link>
                {!isCollapsed && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F9FE] text-[#0B1F33] transition hover:bg-[#F2F2F2] lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                {!isCollapsed && (
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6C7095]">
                        Main Menu
                    </p>
                )}
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = url.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
                                className={`group flex h-11 items-center rounded-2xl px-3 text-sm font-semibold transition-all duration-200 ${
                                    isCollapsed ? 'justify-center' : 'justify-between'
                                } ${
                                    isActive
                                        ? 'border border-[#CA79BE]/20 bg-[#CA79BE]/10 text-[#CA79BE] shadow-[0_10px_24px_rgba(202,121,190,0.16)]'
                                        : 'text-[#6C7095] hover:bg-[#F8F9FE] hover:text-[#0B1F33]'
                                }`}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <Icon
                                        size={20}
                                        className={`shrink-0 ${
                                            isActive ? 'text-[#CA79BE]' : 'text-[#6C7095] group-hover:text-[#0B1F33]'
                                        }`}
                                    />
                                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                                </div>
                                {!isCollapsed && isActive && (
                                    <ChevronRight size={18} className="shrink-0 text-[#CA79BE]" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Menu */}
            <div className="shrink-0 border-t border-[#F2F2F2] p-3">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className={`flex h-11 w-full items-center rounded-2xl px-3 text-sm font-semibold text-[#B268A7] transition hover:bg-[#B268A7]/10 ${
                        isCollapsed ? 'justify-center' : 'gap-3'
                    }`}
                >
                    <LogOut size={20} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">Logout</span>}
                </Link>
                {!isCollapsed && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#F8F9FE] p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0B1F33]">
                    <UserCircle size={23} />
                    </div>
                    <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0B1F33]">
                        {user?.name}
                    </p>
                    <p className="truncate text-xs text-[#6C7095]">
                        {user?.email}
                    </p>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}