import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { storageUrl } from '@/lib/utils';
import { type Profile, type Skill } from '@/types';
import { Head } from '@inertiajs/react';

interface AboutProps {
    profile: Profile;
    skills: Record<string, Skill[]>;
}

export default function About({ profile, skills }: AboutProps) {
    return (
        <PublicLayout>
            <Head title="About" />

            <section className="mx-auto max-w-3xl px-6 py-20">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                    {profile.avatar_path && (
                        <img
                            src={storageUrl(profile.avatar_path)}
                            alt={profile.name}
                            className="h-28 w-28 shrink-0 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            About me
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {profile.headline}
                        </p>
                    </div>
                </div>

                <p className="mt-8 leading-relaxed whitespace-pre-line text-muted-foreground">
                    {profile.bio}
                </p>

                {Object.keys(skills).length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Skills
                        </h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            {Object.entries(skills).map(
                                ([category, categorySkills]) => (
                                    <Card key={category}>
                                        <CardHeader>
                                            <CardTitle className="text-base">
                                                {category}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {categorySkills.map((skill) => (
                                                <div key={skill.id}>
                                                    <div className="mb-1 flex items-center justify-between text-sm">
                                                        <span>
                                                            {skill.name}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            {skill.level}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                                        <div
                                                            className="h-full rounded-full bg-primary"
                                                            style={{
                                                                width: `${skill.level}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
