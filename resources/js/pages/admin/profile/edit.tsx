import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import profileRoutes from '@/routes/admin/profile';
import { type BreadcrumbItem, type Profile } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Profile', href: profileRoutes.edit().url },
];

export default function EditProfile({ profile }: { profile: Profile }) {
    const { data, setData, post, processing, errors } = useForm({
        name: profile.name,
        headline: profile.headline,
        bio: profile.bio,
        email: profile.email,
        phone: profile.phone ?? '',
        location: profile.location ?? '',
        avatar: null as File | null,
        resume: null as File | null,
        github_url: profile.github_url ?? '',
        linkedin_url: profile.linkedin_url ?? '',
        x_url: profile.x_url ?? '',
        website_url: profile.website_url ?? '',
        _method: 'patch',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(profileRoutes.update().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Profile"
                    description="This information powers your Home, About, and Contact pages."
                />

                <form onSubmit={submit} className="max-w-2xl space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                            id="headline"
                            value={data.headline}
                            onChange={(e) =>
                                setData('headline', e.target.value)
                            }
                            placeholder="Full Stack Developer & Creative Problem Solver"
                            required
                        />
                        <InputError message={errors.headline} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            rows={6}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            required
                        />
                        <InputError message={errors.bio} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        {profile.avatar_path && (
                            <img
                                src={storageUrl(profile.avatar_path)}
                                alt={profile.name}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        )}
                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData('avatar', e.target.files?.[0] ?? null)
                            }
                        />
                        <InputError message={errors.avatar} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="resume">Resume (PDF)</Label>
                        {profile.resume_path && (
                            <a
                                href={storageUrl(profile.resume_path)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-primary underline"
                            >
                                View current resume
                            </a>
                        )}
                        <Input
                            id="resume"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setData('resume', e.target.files?.[0] ?? null)
                            }
                        />
                        <InputError message={errors.resume} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={data.location}
                            onChange={(e) =>
                                setData('location', e.target.value)
                            }
                        />
                        <InputError message={errors.location} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="github_url">GitHub URL</Label>
                            <Input
                                id="github_url"
                                type="url"
                                value={data.github_url}
                                onChange={(e) =>
                                    setData('github_url', e.target.value)
                                }
                            />
                            <InputError message={errors.github_url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                            <Input
                                id="linkedin_url"
                                type="url"
                                value={data.linkedin_url}
                                onChange={(e) =>
                                    setData('linkedin_url', e.target.value)
                                }
                            />
                            <InputError message={errors.linkedin_url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="x_url">X (Twitter) URL</Label>
                            <Input
                                id="x_url"
                                type="url"
                                value={data.x_url}
                                onChange={(e) =>
                                    setData('x_url', e.target.value)
                                }
                            />
                            <InputError message={errors.x_url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website_url">Website URL</Label>
                            <Input
                                id="website_url"
                                type="url"
                                value={data.website_url}
                                onChange={(e) =>
                                    setData('website_url', e.target.value)
                                }
                            />
                            <InputError message={errors.website_url} />
                        </div>
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        Save profile
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
