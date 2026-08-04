<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed placeholder portfolio content. Everything here is meant to be
     * replaced through the /admin panel.
     */
    public function run(): void
    {
        Profile::query()->firstOrCreate([], [
            'name' => 'Brian Doughan',
            'headline' => 'Full-Stack Developer — Web Platforms & Mobile Apps',
            'bio' => "I'm a full-stack developer who builds complete, production-ready systems — not just the customer-facing side, but the admin dashboards and APIs that run behind them. My recent work spans a Laravel-powered e-commerce platform, a restaurant management system, a real estate portal, and EverAfter, a cross-platform Flutter app for wedding planning.\n\nI like owning a project end-to-end: modeling the data, building the backend, and shipping the UI that consumes it. Day to day that means Laravel, PHP, and MySQL on the backend, JavaScript on the frontend, and Flutter and Dart when the work calls for a native mobile experience.",
            'email' => 'briandoughan033@gmail.com',
            'phone' => '+233 55 483 9883',
            'location' => 'Accra, Ghana',
            'github_url' => 'https://github.com/bryan-00000',
            'linkedin_url' => 'https://linkedin.com/in/yourusername',
            'x_url' => 'https://x.com/yourusername',
            'website_url' => null,
        ]);

        $skills = [
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 85],
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 85],
            ['name' => 'MySQL', 'category' => 'Backend', 'level' => 80],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'level' => 85],
            ['name' => 'React', 'category' => 'Frontend', 'level' => 80],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 80],
            ['name' => 'Flutter', 'category' => 'Mobile', 'level' => 75],
            ['name' => 'Dart', 'category' => 'Mobile', 'level' => 75],
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 65],
            ['name' => 'Git & GitHub', 'category' => 'Tools', 'level' => 85],
        ];

        foreach ($skills as $index => $skill) {
            Skill::query()->firstOrCreate(
                ['name' => $skill['name']],
                [...$skill, 'sort_order' => $index]
            );
        }

        $projects = [
            [
                'title' => 'EverAfter',
                'summary' => 'A full-featured wedding planning app for guests, budgets, tasks, and vendors.',
                'description' => "EverAfter is a cross-platform wedding planning app built with Flutter. It covers guest management, budget and expense tracking, a checklist/task system, and a shared calendar, alongside a vendor marketplace, seating planner, gift registry, and photo gallery. A guided setup wizard walks couples through cover photo, currency, and budget goals, and a built-in demo account lets visitors explore the full feature set with sample data before creating a real account.",
                'technologies' => ['Flutter', 'Dart', 'Riverpod', 'go_router', 'SQLite'],
                'project_url' => null,
                'repo_url' => 'https://github.com/bryan-00000/Everafter',
                'featured' => true,
            ],
            [
                'title' => 'NextGen Eats',
                'summary' => 'A production-ready restaurant management system with a customer portal and admin dashboard.',
                'description' => 'NextGen Eats is a full restaurant management platform pairing a customer-facing ordering portal with a complete admin dashboard for managing menus, orders, and day-to-day operations.',
                'technologies' => ['JavaScript', 'HTML', 'CSS'],
                'project_url' => null,
                'repo_url' => 'https://github.com/bryan-00000/Nextgen-eats',
                'featured' => true,
            ],
            [
                'title' => 'NextGen Perfumes',
                'summary' => 'An e-commerce perfume store with a Laravel API backend and vanilla JS frontend.',
                'description' => 'NextGen Perfumes is an e-commerce storefront for a perfume brand, built with a Laravel API backend (Sanctum-authenticated, MySQL-backed) and a vanilla JavaScript frontend, containerized with Docker for local development.',
                'technologies' => ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'Docker'],
                'project_url' => null,
                'repo_url' => 'https://github.com/bryan-00000/nextgen-perfumes',
                'featured' => true,
            ],
            [
                'title' => 'NextG Estates',
                'summary' => 'A luxury real estate management system with a customer portal and admin dashboard.',
                'description' => 'NextG Estates is a real estate management system for luxury property listings, featuring a public customer-facing portal for browsing properties alongside an admin dashboard for managing listings.',
                'technologies' => ['JavaScript', 'HTML', 'CSS'],
                'project_url' => null,
                'repo_url' => 'https://github.com/bryan-00000/NextG--Estates',
                'featured' => false,
            ],
        ];

        foreach ($projects as $index => $project) {
            Project::query()->firstOrCreate(
                ['title' => $project['title']],
                [...$project, 'sort_order' => $index]
            );
        }

        $services = [
            ['title' => 'Web Application Development', 'description' => 'Full-stack web applications built with Laravel and modern JavaScript, from database design through to a polished, responsive UI.', 'icon' => 'Code'],
            ['title' => 'Admin Dashboards & Back-Office Tools', 'description' => 'Purpose-built admin dashboards for managing orders, listings, menus, and day-to-day operations — the kind that ship alongside every customer-facing app I build.', 'icon' => 'LayoutTemplate'],
            ['title' => 'E-Commerce & Business Management Systems', 'description' => 'End-to-end systems for online stores and service businesses, covering catalogs, orders, bookings, and reporting.', 'icon' => 'Database'],
            ['title' => 'Cross-Platform Mobile Apps', 'description' => 'Native-feel mobile apps built with Flutter and Dart, from local-first data storage to polished, animated UI.', 'icon' => 'Smartphone'],
            ['title' => 'API Development & Integration', 'description' => 'RESTful APIs with authenticated, documented endpoints that connect your frontend, mobile app, and third-party services.', 'icon' => 'Plug'],
            ['title' => 'Consulting & Code Review', 'description' => 'Technical consulting and code review to help optimize existing projects.', 'icon' => 'MessageSquare'],
        ];

        foreach ($services as $index => $service) {
            Service::query()->firstOrCreate(
                ['title' => $service['title']],
                [...$service, 'sort_order' => $index]
            );
        }
    }
}
