<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'description',
        'image_path',
        'technologies',
        'project_url',
        'repo_url',
        'featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Project $project): void {
            if ($project->slug) {
                return;
            }

            $base = Str::slug($project->title);
            $slug = $base;
            $suffix = 1;

            while (static::query()
                ->where('slug', $slug)
                ->when($project->exists, fn ($query) => $query->whereKeyNot($project->getKey()))
                ->exists()) {
                $slug = "{$base}-{$suffix}";
                $suffix++;
            }

            $project->slug = $slug;
        });
    }
}
