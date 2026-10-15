import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, attendances: initialLogs = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
    });

    const [logs, setLogs] = useState(initialLogs);

    const handleCheck = (e) => {
        e.preventDefault();
        post(route('attendance.store'), {
            onSuccess: (page) => {
                // update logs from props if returned
                setData('student_id','');
            },
            preserveScroll: true
        });
    }

    return (
        <>
            <Head title="CPSU Attendance Checker" />
            <div className="min-h-screen bg-[#f6f7ee]">
                <header className="flex justify-between items-center max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-800 rounded-xl flex items-center justify-center text-white font-black">C</div>
                        <b>CPSU <span className="font-normal text-xs opacity-60 block -mt-1">Attendance System</span></b>
                    </div>
                    <div className="flex gap-3">
                        {auth?.user?
                        <Link href="/dashboard" className="bg-green-800 text-white px-5 py-2 rounded-full text-sm font-bold">Dashboard</Link> :
                        <Link href="/login" className="bg-white border px-6 py-2 rounded-full text-sm font-bold shadow-sm">Admin Login</Link>}
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6 mt-4">
                    <div className="lg:col-span-2 bg-white rounded- p-10 shadow-sm">
                        <h1 className="text-5xl font-black leading-[0.9]">CPSU<br/>Attendance<br/>Checker</h1>
                        <p className="text-xs mt-3 opacity-50">Public Check-in (No Login Needed) - Connected to Database</p>

                        <form onSubmit={handleCheck} className="mt-8 flex gap-2">
                            <input value={data.student_id} onChange={e=>setData('student_id', e.target.value)} placeholder="CPSU-2024-001" className="flex-1 border-2 border-zinc-100 rounded-full px-6 py-4 bg-zinc-50 focus:border-green-800 outline-none" />
                            <button disabled={processing} className="bg-green-800 text-white px-8 rounded-full font-bold">CHECK IN</button>
                        </form>
                        {errors.student_id && <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded-lg">{errors.student_id}</p>}

                        <div className="mt-6 space-y-2 max-h- overflow-auto">
                            {logs.map(l=>(
                                <div key={l.id} className="flex justify-between bg-green-50 border border-green-100 p-4 rounded-2xl">
                                    <div><b className="text-sm">{l.student?.student_id} - {l.student?.fullname}</b><p className="text-xs opacity-60">{l.student?.course} {l.student?.section} - {l.time_in}</p></div>
                                    <span className="bg-green-600 text-white text- px-3 py-1 rounded-full h-fit">{l.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-green-800 text-white rounded- p-8">
                        <h3 className="font-bold text-xl">How it works</h3>
                        <p className="text-sm opacity-80 mt-3 leading-6">1. Student enters ID (no login)<br/>2. Admin logs in to view reports<br/>3. System auto-records time & late status<br/>4. Export to Excel for final report</p>
                        <div className="mt-8 bg-white/10 rounded-2xl p-4 text-sm">Total Today: <b>{logs.length}</b></div>
                        <Link href="/login" className="mt-6 block text-center bg-white text-green-800 font-bold py-3 rounded-full text-sm">Login as Admin</Link>
                    </div>
                </main>
            </div>
        </>
    );
}