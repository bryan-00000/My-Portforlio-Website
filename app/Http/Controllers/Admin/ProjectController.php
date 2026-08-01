<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        Project::query()->create($this->fromRequest($request));

        return to_route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $this->fromRequest($request);

        if ($request->hasFile('image') && $project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->update($data);

        return to_route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return to_route('admin.projects.index')->with('success', 'Project deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function fromRequest(ProjectRequest $request): array
    {
        $data = $request->safe()->except(['image', 'technologies']);

        $data['technologies'] = collect(explode(',', (string) $request->input('technologies')))
            ->map(fn ($tech) => trim($tech))
            ->filter()
            ->values()
            ->all();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }

        return $data;
    }
}
