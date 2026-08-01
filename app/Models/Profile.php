<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name',
        'headline',
        'bio',
        'email',
        'phone',
        'location',
        'avatar_path',
        'resume_path',
        'github_url',
        'linkedin_url',
        'x_url',
        'website_url',
    ];

    /**
     * Fetch the singleton profile row, creating an empty one if it doesn't exist yet.
     */
    public static function singleton(): self
    {
        return static::query()->firstOrCreate([], [
            'name' => '',
            'headline' => '',
            'bio' => '',
            'email' => '',
        ]);
    }
}
