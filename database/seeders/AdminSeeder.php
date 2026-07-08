<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@kiyutz.com'],         
            [
                'name'              => 'Admin Kiyutz',
                'password'          => Hash::make('KiyutzAdmin123_'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}