<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/profile/edit', [
            'profile' => Profile::singleton(),
        ]);
    }

    public function update(ProfileRequest $request): RedirectResponse
    {
        $profile = Profile::singleton();
        $data = $request->safe()->except(['avatar', 'resume']);

        if ($request->hasFile('avatar')) {
            if ($profile->avatar_path) {
                Storage::disk('public')->delete($profile->avatar_path);
            }

            $data['avatar_path'] = $request->file('avatar')->store('profile', 'public');
        }

        if ($request->hasFile('resume')) {
            if ($profile->resume_path) {
                Storage::disk('public')->delete($profile->resume_path);
            }

            $data['resume_path'] = $request->file('resume')->store('profile', 'public');
        }

        $profile->update($data);

        return to_route('admin.profile.edit')->with('success', 'Profile updated.');
    }
}
