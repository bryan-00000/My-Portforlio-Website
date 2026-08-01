<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Seed the single admin account used to manage the portfolio.
     *
     * Credentials come from ADMIN_EMAIL / ADMIN_PASSWORD in .env so nothing
     * sensitive is hardcoded here. Change the password after first login.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@example.com')],
            [
                'name' => 'Admin',
                'password' => env('ADMIN_PASSWORD', 'password'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );
    }
}
