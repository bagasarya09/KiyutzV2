import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthInput({ icon: Icon, type = 'text', label, error, isPassword = false, ...props }) {
    const [show, setShow] = useState(false);
    const inputType = isPassword ? (show ? 'text' : 'password') : type;

    return (
        <div>
            {label && <label className="mb-2 block text-sm font-semibold text-[#0B1F33]">{label}</label>}
            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#F2F2F2] bg-white px-4 transition focus-within:border-[#0B1F33] focus-within:ring-4 focus-within:ring-[#0B1F33]/5">
                {Icon && <Icon size={18} className="text-[#6C7095]" />}
                <input
                    type={inputType}
                    className="h-full w-full border-0 bg-transparent p-0 text-sm font-medium text-[#0B1F33] outline-none focus:border-0 focus:ring-0 placeholder:text-[#6C7095]"
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6C7095] transition hover:bg-[#F8F9FE] hover:text-[#0B1F33]"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
        </div>
    );
}