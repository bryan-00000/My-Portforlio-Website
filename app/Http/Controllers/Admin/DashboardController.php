<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'skills' => Skill::query()->count(),
                'services' => Service::query()->count(),
                'unreadMessages' => ContactMessage::query()->whereNull('read_at')->count(),
            ],
            'recentMessages' => ContactMessage::query()
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
