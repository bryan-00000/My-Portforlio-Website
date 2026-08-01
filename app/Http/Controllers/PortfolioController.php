<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('portfolio/home', [
            'profile' => Profile::singleton(),
            'featuredProjects' => Project::query()
                ->where('featured', true)
                ->orderBy('sort_order')
                ->get(),
            'skills' => Skill::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('portfolio/about', [
            'profile' => Profile::singleton(),
            'skills' => Skill::query()->orderBy('sort_order')->get()->groupBy('category'),
        ]);
    }

    public function projects(): Response
    {
        return Inertia::render('portfolio/projects', [
            'projects' => Project::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('portfolio/services', [
            'services' => Service::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('portfolio/contact', [
            'profile' => Profile::singleton(),
        ]);
    }

    public function submitContact(ContactRequest $request)
    {
        ContactMessage::query()->create($request->only('name', 'email', 'subject', 'body'));

        return back()->with('success', "Thanks for reaching out! I'll get back to you soon.");
    }
}
