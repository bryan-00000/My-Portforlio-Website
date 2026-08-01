<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/skills/index', [
            'skills' => Skill::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(SkillRequest $request): RedirectResponse
    {
        Skill::query()->create($request->validated());

        return to_route('admin.skills.index')->with('success', 'Skill added.');
    }

    public function update(SkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($request->validated());

        return to_route('admin.skills.index')->with('success', 'Skill updated.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return to_route('admin.skills.index')->with('success', 'Skill deleted.');
    }
}
