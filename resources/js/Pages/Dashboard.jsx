import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, attendances, students }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('attendance.store'), {
            onSuccess: () => reset('student_id'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CPSU Attendance - Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-[#f6f7ee] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded- p-8">
                            <h1 className="text-4xl font-black leading-none">CPSU<br/>Attendance<br/>Checker</h1>
                            <p className="text-sm opacity-60 mt-3">Database Connected - {students.length} Students Registered</p>

                            <form onSubmit={submit} className="mt-8 flex gap-2">
                                <input
                                    value={data.student_id}
                                    onChange={e => setData('student_id', e.target.value)}
                                    placeholder="CPSU-2024-001"
                                    className="flex-1 border-2 border-zinc-100 rounded-full px-6 py-4 bg-zinc-50 focus:border-green-800 outline-none"
                                />
                                <button disabled={processing} className="bg-green-800 text-white px-8 rounded-full font-bold hover:bg-green-900">
                                    CHECK IN
                                </button>
                            </form>
                            {errors.student_id && <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-xl">{errors.student_id}</p>}

                            <div className="mt-8">
                                <h3 className="font-bold">Today's Attendance - {new Date().toLocaleDateString()}</h3>
                                <div className="mt-4 space-y-2 max-h- overflow-auto pr-2">
                                    {attendances.length === 0 && <p className="text-sm opacity-50">No check-ins today yet.</p>}
                                    {attendances.map((a) => (
                                        <div key={a.id} className="flex justify-between items-center bg-green-50 border border-green-100 p-4 rounded-2xl">
                                            <div>
                                                <b className="text-sm">{a.student?.student_id} - {a.student?.fullname}</b>
                                                <p className="text-xs opacity-60">{a.student?.course} {a.student?.section} - {a.time_in}</p>
                                            </div>
                                            <span className={`text-white text-xs px-3 py-1 rounded-full h-fit ${a.status === 'late'? 'bg-orange-500' : 'bg-green-600'}`}>
                                                {a.status.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-green-800 text-white rounded- p-8 shadow-sm">
                            <h3 className="font-bold text-xl">Admin Panel</h3>
                            <p className="text-sm opacity-80 mt-3 leading-relaxed">
                                Logged in as {auth.user.email}
                            </p>
                            <div className="mt-8 bg-white/10 rounded-2xl p-4">
                                <p className="text-xs opacity-60">Total Today</p>
                                <p className="text-3xl font-black">{attendances.length}</p>
                            </div>
                            <div className="mt-3 bg-white/10 rounded-2xl p-4">
                                <p className="text-xs opacity-60">Registered Students</p>
                                <p className="text-3xl font-black">{students.length}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded- p-6 shadow-sm">
                            <b className="text-sm">Valid IDs (for testing)</b>
                            <div className="mt-3 space-y-1 text-xs">
                                {students.map(s => (
                                    <div key={s.id} className="flex justify-between border-b py-2">
                                        <span className="font-bold">{s.student_id}</span><span className="opacity-50">{s.fullname}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}