<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Attendance;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'students' => Student::orderBy('fullname')->get(),
            'attendances' => Attendance::with('student')
                ->whereDate('date', today())
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['student_id' => 'required']);

        $student = Student::where('student_id', $request->student_id)->first();

        if (!$student) {
            return back()->withErrors(['student_id' => 'Student not found in CPSU records']);
        }

        $already = Attendance::where('student_id', $student->id)
            ->whereDate('date', today())
            ->first();

        if ($already) {
            return back()->withErrors(['student_id' => $student->fullname . ' already checked in today']);
        }

        Attendance::create([
            'student_id' => $student->id,
            'date' => today(),
            'time_in' => now()->format('H:i:s'),
            'status' => now()->hour >= 8 ? 'late' : 'present'
        ]);

        return back()->with('success', 'Attendance recorded');
    }
}