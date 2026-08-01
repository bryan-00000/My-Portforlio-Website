import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { storageUrl } from '@/lib/utils';
import { type Project } from '@/types';
import { useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

interface ProjectFormProps {
    project?: Project;
    action: string;
    method: 'post' | 'put';
    submitLabel: string;
}

export default function ProjectForm({
    project,
    action,
    method,
    submitLabel,
}: ProjectFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: project?.title ?? '',
        summary: project?.summary ?? '',
        description: project?.description ?? '',
        image: null as File | null,
        technologies: (project?.technologies ?? []).join(', '),
        project_url: project?.project_url ?? '',
        repo_url: project?.repo_url ?? '',
        featured: project?.featured ?? false,
        sort_order: project?.sort_order ?? 0,
        _method: method,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(action, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="max-w-2xl space-y-5">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Input
                    id="summary"
                    value={data.summary}
                    onChange={(e) => setData('summary', e.target.value)}
                    placeholder="A one-line description"
                    required
                />
                <InputError message={errors.summary} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                {project?.image_path && (
                    <img
                        src={storageUrl(project.image_path)}
                        alt={project.title}
                        className="h-32 w-full max-w-xs rounded-md object-cover"
                    />
                )}
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setData('image', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={errors.image} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="technologies">
                    Technologies (comma-separated)
                </Label>
                <Input
                    id="technologies"
                    value={data.technologies}
                    onChange={(e) => setData('technologies', e.target.value)}
                    placeholder="Laravel, React, MySQL"
                />
                <InputError message={errors.technologies} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="project_url">Live URL</Label>
                    <Input
                        id="project_url"
                        type="url"
                        value={data.project_url}
                        onChange={(e) => setData('project_url', e.target.value)}
                        placeholder="https://example.com"
                    />
                    <InputError message={errors.project_url} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="repo_url">Repository URL</Label>
                    <Input
                        id="repo_url"
                        type="url"
                        value={data.repo_url}
                        onChange={(e) => setData('repo_url', e.target.value)}
                        placeholder="https://github.com/you/project"
                    />
                    <InputError message={errors.repo_url} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="sort_order">Sort order</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        min={0}
                        value={data.sort_order}
                        onChange={(e) =>
                            setData('sort_order', Number(e.target.value))
                        }
                    />
                    <InputError message={errors.sort_order} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                        id="featured"
                        checked={data.featured}
                        onCheckedChange={(checked) =>
                            setData('featured', checked === true)
                        }
                    />
                    <Label htmlFor="featured">Feature on the homepage</Label>
                </div>
            </div>

            <Button type="submit" disabled={processing}>
                {processing && <Spinner />}
                {submitLabel}
            </Button>
        </form>
    );
}
