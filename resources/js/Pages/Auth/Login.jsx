import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="CPSU Admin Login" />
            <div className="min-h-screen bg-[#f6f7ee] flex">
                {/* Left - Form */}
                <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-16">
                    <div className="w-full max-w-md">
                        <Link href="/" className="flex items-center gap-3 mb-12">
                            <div className="w-11 h-11 bg-green-800 rounded-xl flex items-center justify-center text-white font-black text-lg">C</div>
                            <div>
                                <b className="text- leading-none">CPSU</b>
                                <span className="font-normal text- opacity-60 block">Attendance System</span>
                            </div>
                        </Link>

                        <h1 className="text-5xl font-black leading-[0.9] tracking-tight">Admin<br/>Login</h1>
                        <p className="text-sm opacity-60 mt-4">Login to manage attendance records. For students, use ID check-in on homepage.</p>

                        {status && <div className="mt-6 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-xl">{status}</div>}

                        <form onSubmit={submit} className="mt-10 space-y-4">
                            <div>
                                <label className="text-xs font-bold opacity-70 ml-2">EMAIL</label>
                                <input type="email" value={data.email} onChange={e=>setData('email', e.target.value)} placeholder="admin@cpsu.edu.ph" className="w-full mt-2 border-2 border-zinc-100 rounded-full px-6 py-4 bg-white focus:border-green-800 outline-none" />
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-bold opacity-70 ml-2">PASSWORD</label>
                                <input type="password" value={data.password} onChange={e=>setData('password', e.target.value)} placeholder="••••••••" className="w-full mt-2 border-2 border-zinc-100 rounded-full px-6 py-4 bg-white focus:border-green-800 outline-none" />
                                {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between px-2 pt-2">
                                <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={data.remember} onChange={e=>setData('remember', e.target.checked)} /> Remember me</label>
                                {canResetPassword && <Link href={route('password.request')} className="text-xs opacity-60 hover:opacity-100 underline">Forgot password?</Link>}
                            </div>

                            <button disabled={processing} className="w-full bg-green-800 text-white py-4 rounded-full font-bold mt-4 hover:bg-green-900 transition">LOG IN →</button>

                            <div className="text-center text-xs opacity-60 mt-6">
                                Test: admin@cpsu.edu.ph / admin123<br/>
                                <Link href="/" className="text-green-800 font-bold opacity-100">← Back to Student Check-in</Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right - Green Panel */}
                <div className="hidden lg:flex w-[45%] bg-green-800 text-white p-12 flex-col justify-between rounded-l- m-3">
                    <div></div>
                    <div>
                        <h2 className="text-5xl font-black leading-[0.9]">CPSU<br/>Attendance<br/>Checker</h2>
                        <p className="opacity-70 mt-6 text-sm leading-6">Secure admin panel for BSIT 3. Manage students, track time-in, detect late entries, and export final reports to Excel.</p>
                        <div className="mt-10 grid grid-cols-2 gap-3">
                            <div className="bg-white/10 rounded-2xl p-4"><p className="text-2xl font-black">100%</p><p className="text-xs opacity-60">Secure</p></div>
                            <div className="bg-white/10 rounded-2xl p-4"><p className="text-2xl font-black">BSIT</p><p className="text-xs opacity-60">Course</p></div>
                        </div>
                    </div>
                    <p className="text-xs opacity-40">© 2026 CPSU - Central Philippines State University</p>
                </div>
            </div>
        </>
    );
}