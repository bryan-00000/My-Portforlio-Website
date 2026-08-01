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
            'name' => 'Your Name',
            'headline' => 'Full Stack Developer & Creative Problem Solver',
            'bio' => "I'm a passionate full-stack developer with expertise in modern web technologies. Replace this bio from the admin panel with your own background, experience, and what makes you unique.",
            'email' => 'you@example.com',
            'phone' => '+1 (555) 000-0000',
            'location' => 'Your City, Your Country',
            'github_url' => 'https://github.com/yourusername',
            'linkedin_url' => 'https://linkedin.com/in/yourusername',
            'x_url' => 'https://x.com/yourusername',
            'website_url' => null,
        ]);

        $skills = [
            ['name' => 'PHP / Laravel', 'category' => 'Backend', 'level' => 90],
            ['name' => 'MySQL / PostgreSQL', 'category' => 'Backend', 'level' => 80],
            ['name' => 'React', 'category' => 'Frontend', 'level' => 85],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'level' => 80],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 85],
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 70],
        ];

        foreach ($skills as $index => $skill) {
            Skill::query()->firstOrCreate(
                ['name' => $skill['name']],
                [...$skill, 'sort_order' => $index]
            );
        }

        $projects = [
            [
                'title' => 'Sample Project One',
                'summary' => 'A short one-line summary of what this project does.',
                'description' => "Replace this with a real description of the project: the problem it solved, your role, and the outcome.",
                'technologies' => ['Laravel', 'React', 'MySQL'],
                'project_url' => null,
                'repo_url' => null,
                'featured' => true,
            ],
            [
                'title' => 'Sample Project Two',
                'summary' => 'Another short project summary goes here.',
                'description' => 'Replace with real project details from the admin panel.',
                'technologies' => ['Laravel', 'Inertia', 'Tailwind CSS'],
                'project_url' => null,
                'repo_url' => null,
                'featured' => true,
            ],
            [
                'title' => 'Sample Project Three',
                'summary' => 'A third placeholder project summary.',
                'description' => 'Replace with real project details from the admin panel.',
                'technologies' => ['TypeScript', 'PostgreSQL'],
                'project_url' => null,
                'repo_url' => null,
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
            ['title' => 'Web Application Development', 'description' => 'Custom web applications with robust backend architecture and intuitive UIs.', 'icon' => 'Code'],
            ['title' => 'Frontend Development', 'description' => 'Modern, responsive interfaces built with React and Tailwind CSS.', 'icon' => 'LayoutTemplate'],
            ['title' => 'API Development', 'description' => 'RESTful APIs and integrations between systems and platforms.', 'icon' => 'Plug'],
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
