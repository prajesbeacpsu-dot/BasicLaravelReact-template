<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['student_id','fullname','course','section'];
    
    public function attendances() { 
        return $this->hasMany(Attendance::class); 
    }
}